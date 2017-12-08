from pymongo import MongoClient

class MongoPipe:
    def __init__(self, collection):
        client = MongoClient()
        client = MongoClient('localhost', 27017)
        self.db = client['stack-questions']
        self.collection = self.db[collection]

    def pipe_data(self, item):
        print("SAVING",item)
        save_item = {'title': item.title, 'url': item.url,  'link': item.link, 'score': item.score, 'is_answered': str(item.is_answered), 'tags': item.tags}
        save_item['accepted_answer_id'] = item.accepted_answer_id if 'accepted_answer_id' in item.__dict__ else 'None'
        self.collection.update_one({'title': item.title}, {'$set': save_item}, upsert=True)
