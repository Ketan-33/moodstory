from models.keywordGen.model import KeywordGenerator


def generate_words(mood: str):
    model = KeywordGenerator()
    results = model.beam_search(mood, beam_width=5)
    return results

def best_sequence(results, normalize=True):
    if normalize:
        # choose based on average score per token
        return min(results, key=lambda x: x[1] / max(1, len(x[0].split())))
    else:
        # choose the raw best (lowest score)
        return results[0]


print(best_sequence(generate_words("happy"), normalize=True))