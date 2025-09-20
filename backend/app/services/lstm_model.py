from models.keywordGen.model import KeywordGenerator


def generate_words(mood: str):
    model = KeywordGenerator()
    results = model.beam_search(mood, beam_width=5)

    return min(results, key=lambda x: x[1] / max(1, len(x[0].split())))[0].split()

# print(generate_words("happy"))