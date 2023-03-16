
def any7(nums):
    """Are any of the numbers seven?"""
    
    for num in nums:
        if num == 7:
            return True
        
    return False


#  print("True") if nums == any7[nums] else print("False")
    # """Are any of these numbers a 7? (True/False)"""

    # YOUR CODE HERE 

print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))

