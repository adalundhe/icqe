import stackexchange

class CorpusBuilder:
    def __init__(self):
        with open('key.txt') as key_file:
            for line in key_file:
                key = line.strip("\n")
                self.query_builder = stackexchange.Site(stackexchange.StackOverflow, app_key=key)

    def execute_query(self, query, sortBy, minRange, maxRange, filterType=None, start_page=1):
        print("executing:",query,sortBy, minRange,maxRange,filterType, start_page)
        return self.query_builder.search(tagged=query, sort=sortBy, min=minRange, max=maxRange, has_more=True, page_size=50, page=start_page, filter=filterType)
