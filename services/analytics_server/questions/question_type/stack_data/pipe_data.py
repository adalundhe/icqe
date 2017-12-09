from mongo_pipe import MongoPipe
from build_corpus import CorpusBuilder
from sys import argv


class DataPipe:
    def __init__(self, pipe_to):
        self.pipe = MongoPipe(pipe_to)
        self.builder = CorpusBuilder()

    def execute_pipe(self, query, sort, restart_page=1):
        restart = int(restart_page)
        total = self.builder.execute_query(query, sort, 0, 20000, 'total')
        selected_query = self.builder.execute_query(query, sort, 0, 20000, None, restart)
        query_data = None

        while not selected_query.extend_next() == len(total):
            selected_query = selected_query.extend_next()
            query_data = [self.pipe.pipe_data(item) for item in selected_query.fetch_next()]

test_pipe = DataPipe(argv[1])

test_pipe.execute_pipe(argv[1], argv[2], argv[3])
