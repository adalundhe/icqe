package user

import (
	"log"
  "github.com/gocql/gocql"
	"github.com/graphql-go/graphql"
	"github.com/scorbettUM/server/app/cassandra"
)

func GetUser(userId gocql.UUID)(User, error){
  var firstName string
  var lastName string

	session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
	defer session.Close()

  if err := session.Query(`SELECT firstName, lastName FROM graphql.user WHERE userId = ? ALLOW FILTERING;`,
						userId).Scan(&firstName, &lastName);

  err != nil {
    return User{}, err
  }

  return User{UserId: userId, FirstName: firstName, LastName: lastName}, nil
}

func UserFromId(args graphql.ResolveParams)(interface{}, error){

	newId, _ := gocql.ParseUUID(args.Args["TokenId"].(string))
	newFirstName := ""
	newLastName := ""

	newUser := &User{
		UserId: newId,
		FirstName: newFirstName,
		LastName: newLastName,
	}

	session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

	if err := session.Query(`INSERT INTO graphql.user (userId, firstName, lastName) VALUES (?, ?, ?);`,
						newId, newFirstName, newLastName).Exec();

	err != nil {
		return User{}, err
	}

	return newUser, nil
}

func AddUser(args graphql.ResolveParams)(interface{}, error){

  newId := gocql.TimeUUID()
  newFirstName := args.Args["FirstName"].(string)
  newLastName := args.Args["LastName"].(string)

	newUser := &User{
		UserId: newId,
		FirstName: newFirstName,
		LastName: newLastName,
	}

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`INSERT INTO graphql.user (userId, firstName, lastName) VALUES (?, ?, ?);`,
						newId, newFirstName, newLastName).Exec();

	err != nil {
		return User{}, err
	}

	return newUser, nil
}

func UpdateUserById(args graphql.ResolveParams)(User, error){
	userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))
	updatedFirstName := args.Args["FirstName"].(string)
	updatedLastName := args.Args["LastName"].(string)

	updatedUser, err := GetUser(userId)

	session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
	defer session.Close()

	if len(updatedFirstName) > 0 {
		if err := session.Query(`UPDATE graphql.user SET firstName = ? WHERE userId = ?;`,
							updatedFirstName, userId).Exec();

		err != nil {
			log.Fatal(err)
		}

		updatedUser.FirstName = updatedFirstName
	}

	if len(updatedLastName) > 0 {
		if err := session.Query(`UPDATE graphql.user SET lastName = ? WHERE userId = ?;`,
							updatedLastName, userId).Exec();

		err != nil {
			return User{}, err
		}

		updatedUser.LastName = updatedLastName
	}

	return updatedUser, err

}
