from .provider import Provider
from questions.question_type.stack_data.tokenmaker import Tokenizer
from collections import Counter
import math
import numpy as np
import scipy.stats as sstat

class CustomRecommender:
    def __init__(self, init_data):
        self.provider = Provider(init_data)
        self.tokenizer = Tokenizer()
        self.refs, self.questions = self.provider.refs, self.provider.questions
        self.global_values = []
        self.question_asked = []


    def filter_mtx(self, tokenized_question, limit=10):
        self.question_asked = tokenized_question
        tags = {}
        questions = []
        for token in tokenized_question:
            try:
                tags[token] = self.refs[token]
                questions += tags[token]['cols']
            except:
                print("Not found")

        questions = np.asarray(questions)
        values, counts = np.unique(questions, return_counts=True)
        idx = np.argsort(counts)[::-1]
        self.global_values = values[idx]

        return self.filter_ids(self.global_values, 0, limit)


    def get_questions(self,id_block):
        results = self.provider.get_questions(id_block)
        return results[:len(id_block)]


    def filter_ids(self, values, start ,limit):
        values = list(filter( lambda x: x.size > 0, values[start:start + limit * 2]))
        return self.questions[values]


    def calc_sim(self, filtered_questions):

        cos_sim = []
        question_asked = Counter(self.question_asked)

        for question in filtered_questions:
            body = Counter(self.tokenizer.tokenize(question['body']))
            cos_sim.append({'similarity': self.get_cosine(question_asked, body), 'body': question['body'], 'linkto': question['url']})

        return sorted(cos_sim, key=lambda x: x['similarity'])[::-1]


    def get_cosine(self,vec1, vec2):
         intersection = set(vec1.keys()) & set(vec2.keys())
         numerator = sum([vec1[x] * vec2[x] for x in intersection])

         sum1 = sum([vec1[x]**2 for x in vec1.keys()])
         sum2 = sum([vec2[x]**2 for x in vec2.keys()])
         denominator = math.sqrt(sum1) * math.sqrt(sum2)

         if not denominator:
            return 0.0
         else:
            return float(numerator) / denominator

    def recommend(self, query,results=10):
          tokenized_question = self.tokenizer.tokenize(query.lower())
          _ids = self.filter_mtx(tokenized_question,results)
          results = self.get_questions(_ids)
          return self.calc_sim(results)
