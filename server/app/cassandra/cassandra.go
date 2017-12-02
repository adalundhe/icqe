package cassandra

import (
	"github.com/gocql/gocql"
	"os"
)

var session *gocql.Session
var Host string = os.Getenv("HOST_DB")
var port string = os.Getenv("DB_PORT")
var CassUsername string = os.Getenv("CASS_USERNAME")
var CassPassword string = os.Getenv("CASS_PASSWORD")

func getCluster() *gocql.ClusterConfig {
     cluster := gocql.NewCluster("127.0.0.1")
     pass := gocql.PasswordAuthenticator{CassUsername, CassPassword}
     cluster.Keyspace = "graphql"
     cluster.Authenticator = pass
     cluster.Consistency = gocql.One
     cluster.NumConns = 1
     return cluster
}

func GetCass()(*gocql.Session, error) {
	var err error
	if session == nil || session.Closed() {
			session, err := getCluster().CreateSession()
			return session, err
	}

	if err != nil{
		panic(err)
	}
	return nil, err
}
