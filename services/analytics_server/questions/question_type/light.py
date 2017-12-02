import numpy as np
from questions.question_type.user_based_rec.user_question_mtx import UserQuestionMtx
from questions.question_type.question_based_rec.question_tag_mtx import QuestionTagMtx
from questions.question_type.custom_recommender.custom_recommender import CustomRecommender
from questions.question_type.stack_data.tokenmaker import Tokenizer
from lightfm.evaluation import auc_score
from lightfm import LightFM
import time


class TagRecommender():
    def __init__(self):
        userquestions = UserQuestionMtx('load')
        self.userquestionmtx = userquestions.construct_mtx()

        questiontags = QuestionTagMtx('load')
        self.questiontagmtx = questiontags.construct_mtx()
        self.tag_labels = questiontags.tags
        self.customrecommender = CustomRecommender('load')
        self.NUM_THREADS = 6
        self.NUM_COMPONENTS = 30
        self.NUM_EPOCHS = 3
        self.ITEM_ALPHA = 1e-6
        self.tokenizer = Tokenizer()

        # Define a new model instance
        model = LightFM(loss='warp',
                        item_alpha=self.ITEM_ALPHA,
                        no_components=self.NUM_COMPONENTS)

        # Fit the hybrid model. Note that this time, we pass
        # in the item features matrix.
        self.model = model.fit(self.userquestionmtx,
                        item_features=self.questiontagmtx,
                        epochs=self.NUM_EPOCHS,
                        num_threads=self.NUM_THREADS)

    def train(self, iters):
        self.NUM_EPOCHS = iters
        model = LightFM(loss='warp',
                        item_alpha=self.ITEM_ALPHA,
                        no_components=self.NUM_COMPONENTS)

        # Fit the hybrid model. Note that this time, we pass
        # in the item features matrix.
        self.model = model.fit(self.userquestionmtx,
                        item_features=self.questiontagmtx,
                        epochs=self.NUM_EPOCHS,
                        num_threads=self.NUM_THREADS)



    def get_similar_tags(self, tag_id, start, stop):
        # Define similarity as the cosine of the angle
        # between the tag latent vectors

        # Normalize the vectors to unit length
        tag_embeddings = (self.model.item_embeddings.T / np.linalg.norm(self.model.item_embeddings, axis=1)).T

        query_embedding = tag_embeddings[tag_id]
        similarity = np.dot(tag_embeddings, query_embedding)
        most_similar = np.argsort(-similarity)[start:stop]

        return most_similar


    def tags_to_questions(self, queries):
        start = time.time()
        results = []
        query = ' '.join(queries)
        [results.append(question) for question in self.customrecommender.recommend(query)]
        for tag in queries:
            tag_id = self.tag_labels.tolist().index(tag)
            recommended = ' '.join(self.tag_labels[self.get_similar_tags(tag_id, 1, 4)]) + ' ' + tag
            [results.append(question) for question in self.customrecommender.recommend(recommended)]

        end = time.time()

        return {'responses': results, 'response-time': (end-start), 'response-length': len(results)}

    def ask_question(self, question):
        print("INCOMING QUESTIONS:",question)
        queries = self.tokenizer.tokenize(question)
        return self.tags_to_questions(queries)
