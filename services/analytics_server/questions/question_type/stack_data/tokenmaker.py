import nltk
from nltk.corpus import stopwords
import re, string

class Tokenizer:
    def __init__(self):
        self.word_list = []

    def tokenize(self, string):
        pattern = re.compile('[\W_]+')
        tokens = pattern.sub(' ', string).lower().split(' ')
        return list(filter(lambda x: x not in set(stopwords.words("english")), list(filter(None,tokens))))
