package address

import (
  "github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
	"github.com/scorbettUM/server/app/cassandra"
)

func GetAddressById(addressId gocql.UUID)(Address, error){

  var city string
  var state string
  var zip string
	var userId gocql.UUID

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`SELECT city, state, zip, userId FROM graphql.address WHERE addressId = ? ALLOW FILTERING;`,
						addressId).Scan(&city, &state, &zip, &userId);

  err != nil {
    return Address{}, err
  }

  return Address{AddressId: addressId, City: city, State: state, Zip: zip, UserId: userId}, nil
}

func GetAddressByUser(userId gocql.UUID)(Address, error){

	var addressId gocql.UUID
  var city string
  var state string
  var zip string

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`SELECT addressId, city, state, zip FROM graphql.address WHERE userId = ? ALLOW FILTERING;`,
						userId).Scan(&addressId, &city, &state, &zip);

  err != nil {
    return Address{}, err
  }

  return Address{AddressId: addressId, City: city, State: state, Zip: zip, UserId: userId}, nil
}


func AddNewAddress(args graphql.ResolveParams)(interface{}, error){

	newId := gocql.TimeUUID()
  newCity :=  args.Args["City"].(string)
  newState := args.Args["State"].(string)
  newZip := args.Args["Zip"].(string)
	userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))

	newAddress := &Address{
		AddressId: newId,
		City: newCity,
		State: newState,
		Zip: newZip,
		UserId: userId,
	}

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`INSERT INTO graphql.address (addressId, city, state, zip, userId) VALUES (?, ?, ?, ?, ?)`,
						newId, newCity, newState, newZip, userId).Exec();

	err != nil {
		return Address{}, err
	}

	return newAddress, nil
}

func UpdateAddressById(args graphql.ResolveParams)(interface{}, error){
	addressId, _ := gocql.ParseUUID(args.Args["AddressId"].(string))
  updatedCity :=  args.Args["City"].(string)
  updatedState := args.Args["State"].(string)
  updatedZip := args.Args["Zip"].(string)
	userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))

	updatedAddress, err := GetAddressById(addressId)

	session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

	if len(updatedCity) > 0 {
		if err := session.Query(`UPDATE graphql.address SET city = ? WHERE addressId = ? AND userId = ?`,
							updatedCity, addressId, userId).Exec();

		err != nil {
			return Address{}, err
		}

		updatedAddress.City = updatedCity
	}

	if len(updatedState) > 0 {
		if err := session.Query(`UPDATE graphql.address SET state = ? WHERE addressId = ? AND userId = ?`,
							updatedState, addressId, userId).Exec();

		err != nil {
			return Address{}, err
		}

		updatedAddress.State = updatedState
	}
	if len(updatedZip) > 0 {
		if err := session.Query(`UPDATE graphql.address SET zip = ? WHERE addressId = ? AND userId = ?`,
							updatedZip, addressId, userId).Exec();

		err != nil {
			return Address{}, err
		}

		updatedAddress.Zip  = updatedZip
	}

	return updatedAddress, err

}
