package question

import (
  "log"
  "time"
  "github.com/gocql/gocql"
  "github.com/graphql-go/graphql"
	"github.com/scorbettUM/server/app/cassandra"
)

func GetAll()([]Question, error){
  var questions []Question
  var body string
  var userId gocql.UUID
  var questionId gocql.UUID

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  iter := session.Query(`SELECT body, userId, questionId FROM graphql.question;`).Iter()

  for iter.Scan(&body, &userId, &questionId){
    question := Question{Body: body, UserId: userId, QuestionId: questionId}
    questions = append(questions, question)
  }
  if err := iter.Close(); err != nil{
    panic(err)
  }

  return questions, nil

}

func AddNewQuestion(args graphql.ResolveParams)(interface{}, error){

  newId := gocql.TimeUUID()
  userId, _ := gocql.ParseUUID(args.Args["UserId"].(string))
  newQuestionBody := args.Args["Body"].(string)
  answerId, _ := args.Args["AnswerId"].(string)
  insertTime := time.Now()

  newQuestion := &Question{
    QuestionId: newId,
    Body: newQuestionBody,
    UserId: userId,
    AnswerId: answerId,
  }

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()


  if err := session.Query(`INSERT INTO graphql.question (questionId, body, userId, answerId, created, modified) VALUES (?, ?, ?, ?, ?, ?)`,
		        newId, newQuestionBody, userId, answerId, insertTime, insertTime).Exec();

  err != nil {
		return Question{}, err
	}

	return newQuestion, nil
}

func GetQuestionsByUser(currentUserId gocql.UUID)([]Question, error){

  var questions []Question
  var body string
  var questionId gocql.UUID

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  iter := session.Query(`SELECT body, questionId FROM graphql.question WHERE userId = ? ALLOW FILTERING;`,
          currentUserId).Iter()

  for iter.Scan(&body, &questionId){
    foundQuestion := Question{Body: body, UserId: currentUserId, QuestionId: questionId}
    questions = append(questions, foundQuestion)
  }
  if err := iter.Close(); err != nil{
    panic(err)
  }

  return questions, nil
}

func GetQuestionByUser(currentUserId gocql.UUID, questionId gocql.UUID)(Question, error){
  var body string

  session, err := cassandra.GetCass()
	if err != nil{
		panic(err)
	}
  defer session.Close()

  if err := session.Query(`SELECT body FROM graphql.question WHERE userId = ? AND questionId = ? ALLOW FILTERING;`,
				    currentUserId, questionId).Scan(&body);

  err != nil{
    log.Fatal(err)
  }

	return Question{Body: body, UserId: currentUserId, QuestionId: questionId}, nil

}

func GetQuestionsByIds(questionIds []gocql.UUID)([]Question, error){
  var body string
  var userId gocql.UUID
  var questions []Question

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  for _, questionId := range questionIds{
    if err := session.Query(`SELECT body, userId FROM graphql.question WHERE questionId = ?;`,
            questionId).Scan(&body, &userId);

    err != nil{
      panic(err)
    }

    foundQuestion := Question{QuestionId: questionId, Body: body, UserId: userId}
    questions = append(questions, foundQuestion)

  }
  return questions, nil
}

func GetQuestionById(questionId gocql.UUID)(Question, error){
  var body string
  var userId gocql.UUID

  session, err := cassandra.GetCass()
  if err != nil{
    panic(err)
  }
  defer session.Close()

  if err := session.Query(`SELECT body, userId FROM graphql.question WHERE questionId = ? ALLOW FILTERING;`,
            questionId).Scan(&body, &userId);

  err != nil{
    panic(err)
  }

  return Question{Body: body, UserId: userId, QuestionId: questionId}, nil

}
