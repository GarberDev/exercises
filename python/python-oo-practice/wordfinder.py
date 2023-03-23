"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """find random words"""
"""
    >>> wf = WordFinder("/home/justi/exercises/python/python-oo-practice/words.txt")
    3 words read

    >>> wf.random()
    'cat'

    >>> wf.random()
    'cat'

    >>> wf.random()
    'porcupine'

    >>> wf.random()
    'dog'"""

    def __init__(self,path):
        """reads the words from the file and adds them to the words list"""
        self.path = path
        self.words = []
        self.read_words()

    def read_words(self):
        with open(self.path) as file:
            for line in file:
                word = line.strip()
                if word:
                    self.words.append(word)
        print(f"{len(self.words)} words read")
    
    def random(self):
        return random.choice(self.words)



class SpecialWordFinder(WordFinder):
    """Special word finder that ignores blank lines and comment lines"""

    def __init__(self, path):
        """call init method of the superclass using the super() function initializes the words atribute of the""""
        super().__init__(path)
        """modify wrods attribute using list comprehension"""
        self.words = [word for word in self.words if word and not word.startswith('#')]
