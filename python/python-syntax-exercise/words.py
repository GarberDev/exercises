def print_upper_words(words):
    """Converts the words to uppercase and prints them on a separate line"""
    for word in words:
        print(word.upper())

def print_upper_words_starting_with(words, must_start_with):
    """ converts words to uppercase and prints only the ones the start with the letter"""
    for word in words:
        for letter in word:
            if letter == must_start_with:
                print(word)