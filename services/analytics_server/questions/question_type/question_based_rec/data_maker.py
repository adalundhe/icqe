import numpy as np
from cassandra.cluster import Cluster
from cassandra.encoder import Encoder
from cassandra.query import dict_factory, ordered_dict_factory
from recommender import Recommender
from random import randint
from stack_data.seed_questions import DataPipe
import uuid

"""
    Creates dummy users for matrix ref.
"""

cluster = Cluster()
session = cluster.connect('graphql')
session.row_factory = dict_factory
encoder = Encoder()
pipe = DataPipe('javascript')

def makeUser(num_users):
    users = []
    for next_user in range(num_users):
        new_user = {'userid': uuid.uuid4(), 'firstname': "FIRST"+str(next_user), 'lastname': "LAST"+str(next_user)}
        users.append(new_user)

    return users


def getQuestions(users):
    questions = np.asarray([question for question in session.execute("""SELECT * FROM question""")])
    user_questions = []
    selected_users = []

    while(questions.size > 0):
        user_index = randint(0, users.size-1)
        indexes = [randint(0, questions.size-1) for x in range(randint(0,10))]

        user = users[user_index]
        selected_questions = questions[indexes]
        selected_users.append(user)

        questions = np.delete(questions, indexes)
        users = np.delete(users, user_index)
        modified = []

        for question in selected_questions:
            question['userid'] = user['userid']
            modified.append(question)

        user_questions.append(modified)
    return user_questions, np.asarray(selected_users)

def sendQuestionsToDB(questions):
    pipe.questions_to_cassandra(questions)

def sendUsersToDB(users):
    pipe.users_to_cassandra(users)


users = np.asarray(makeUser(20000))

user_questions, selected_users = getQuestions(users)

sendUsersToDB(selected_users)
sendQuestionsToDB(user_questions)
