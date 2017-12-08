package tag

import (
  "fmt"
  "time"
  "log"
  "github.com/gocql/gocql"
  "github.com/graphql-go/graphql"
  "github.com/scorbettUM/server/app/cassandra"
)

func GetAll()(interface{}, error){
  var body string
  var questionId gocql.UUID
  var userId gocql.UUID
  var tagId gocql.UUID
  var tags []Tag

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  iter := session.Query(`SELECT body, questionId, userId, tagId FROM graphql.tag;`).Iter()

  for iter.Scan(&body, &questionId, &userId, &tagId){
    foundTag := Tag{Body: body, QuestionId: questionId, UserId: userId, TagId: tagId}
    tags = append(tags, foundTag)
  }
  if err := iter.Close(); err != nil{
    panic(err)
  }

  fmt.Println("Returning",tags, err)
  return tags, nil

}

func AddNewTag(args graphql.ResolveParams)(interface{}, error){
  newId := gocql.TimeUUID()
  newBody := args.Args["Body"].(string)
  questionId, _ := gocql.ParseUUID(args.Args["QuestionId"].(string))
  userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))

  newTag := &Tag{
    TagId: newId,
    Body: newBody,
    QuestionId: questionId,
    UserId: userId,
  }

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`INSERT INTO graphql.tag (tagId, body, questionId, userId) VALUES (?, ?, ?, ?)`,
            newId, newBody, questionId, userId).Exec();

  err != nil {
		return Tag{}, err
	}

	return  newTag, nil
}

func AddNewTags(args graphql.ResolveParams)(interface{}, error){
  tagsList := args.Args["Tags"].([]interface{})
  questionId, _ := gocql.ParseUUID(args.Args["QuestionId"].(string))
  userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))

  var newTags []Tag

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  for _, tag := range tagsList {
    newId := gocql.TimeUUID()
    newBody := tag.(string)

    insertTime := time.Now()

    newTag := Tag{
      TagId: newId,
      Body: newBody,
      QuestionId: questionId,
      UserId: userId,
    }

    if err := session.Query(`INSERT INTO graphql.tag (tagId, body, questionId, userId, created, modified) VALUES (?, ?, ?, ?, ?, ?)`,
              newId, newBody, questionId, userId, insertTime, insertTime).Exec();

    err != nil {
  		return Tag{}, err
  	}

    newTags = append(newTags, newTag)

  }

  return newTags, nil
}

func GetTagsByQuestionId(questionId gocql.UUID)([]Tag, error){

  var body string
  var tags []Tag
  var tagId gocql.UUID
  var userId gocql.UUID

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  iter := session.Query(`SELECT body, userId, tagId FROM graphql.tag WHERE questionId = ? ALLOW FILTERING;`,
          questionId).Iter()

  for iter.Scan(&body, &userId, &tagId){
    foundTag := Tag{Body: body, QuestionId: questionId, UserId: userId, TagId: tagId}
    tags = append(tags, foundTag)
  }
  if err := iter.Close(); err != nil{
    panic(err)
  }

  return tags, nil
}

func GetTagsByUserId(userId gocql.UUID)([]Tag, error){
  var body string
  var tags []Tag
  var tagId gocql.UUID
  var questionId gocql.UUID

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  iter := session.Query(`SELECT body, questionId, tagId FROM graphql.tag WHERE userId = ? ALLOW FILTERING;`,
          userId).Iter()

  for iter.Scan(&body, &questionId, &tagId){
    foundTag := Tag{Body: body, QuestionId: questionId, UserId: userId, TagId: tagId}
    tags = append(tags, foundTag)
  }
  if err := iter.Close(); err != nil{
    panic(err)
  }

  return tags, nil
}

func GetTagById(tagId gocql.UUID)(Tag, error){
    var body string
    var userId gocql.UUID
    var questionId gocql.UUID

    session, err := cassandra.GetCass()
		if err != nil{
			panic(err)
		}
    defer session.Close()

    if err := session.Query(`SELECT body, userId, questionId FROM graphql.tag WHERE tagId = ? ALLOW FILTERING;`,
              tagId).Scan(&body, &userId, &questionId);

    err != nil {
  		log.Fatal(err)
  	}

    return Tag{Body: body, UserId: userId, QuestionId: questionId, TagId: tagId}, nil
}

func GetTagsByBody(tagBody string)([]Tag, error){
  var tagId gocql.UUID
  var questionId gocql.UUID
  var userId gocql.UUID
  var tags []Tag

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  iter := session.Query(`SELECT tagId, questionId, userId FROM graphql.tag WHERE body = ? ALLOW FILTERING;`,
          tagBody).Iter()

  for iter.Scan(&tagId, &questionId, &userId){
    foundTag := Tag{TagId: tagId, Body: tagBody, QuestionId: questionId, UserId: userId}
    tags = append(tags, foundTag)
  }

  if err := iter.Close(); err != nil{
    panic(err)
  }

  return tags, nil
}
