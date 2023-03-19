def freq_counter(col):
    freq = {}
    for elem in col:
        freq[elem] = freq.get(elem, 0) +1
    return freq


def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    # Convert numbers to strings so we can iterate over digits
    str1, str2 = str(num1), str(num2)
    
    # Use freq_counter to count the frequency of each digit
    freq1, freq2 = freq_counter(str1), freq_counter(str2)
    
    # Check if the frequencies of digits are the same
    return freq1 == freq2