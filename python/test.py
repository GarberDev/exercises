# nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]







# [num * 2 for num in nums]
# ["hiiii" for num in nums]

def gen_board(size, initial_val=None):
    return [[initial_val for x in range(size)] for y in range(size)]



