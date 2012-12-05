# Recursion

def iterPower(base, exp):  
  res = base
  i = exp
  
  while i > 1:
    res = res * base
    
    i -= 1
  
  return res
    
  
print iterPower(2, 3)


def recurPower(base, exp):
  if exp <= 0:
    return 1
  elif exp == 1:
    return base
  else:
    return base * recurPower(base, exp-1)
  
print recurPower(2, 3)


def gcdIter(a, b):
    start = min(a, b)
    
    while start >= 1:
      if ((a % start == 0) and (b % start == 0)):
        return start
      else:
        start -= 1
    
print gcdIter(9, 12)


def gcdRecur(a, b):
  if (b == 0):
    return a
  else:
    return gcdRecur(b, a % b) 
  

print gcdRecur(9, 12)


def lenIter(aStr):
  count = 0
  
  chars = list(aStr)
  
  for i in chars:
    count += 1
    
  return count

print lenIter("hello")


def lenRecur(aStr):
  if (aStr == ''):
    return 0
  else:
    return 1 + lenRecur(aStr[1:])

print lenRecur("hello")


def isIn(char, aStr):
  if (aStr == ''):
      return False
  elif (len(aStr) == 1):
      return char == aStr
  elif aStr[(len(aStr))/2] == char:
      return True
  elif char > aStr[(len(aStr)/2)]:
      return isIn(char, aStr[(len(aStr)/2):])
  else:
      return isIn(char, aStr[:(len(aStr)/2)])

print isIn("z", "abcdefg")

# Objects

def oddTuples(aTup):
    '''
    aTup: a tuple
    
    returns: tuple, every other element of aTup. 
    '''
    # Your Code Here
    return aTup[::2]
    
print oddTuples(('I', 'am', 'a', 'test', 'tuple'))


animals = { 'a': ['aardvark'], 'b': ['baboon'], 'c': ['coati']}

animals['d'] = ['donkey']
animals['d'].append('dog')
animals['d'].append('dingo')


def howMany(aDict):
  count = 0
  
  for i in aDict:
    count += len(aDict[i])
    
  return count
  

def biggest(aDict):
  if len(aDict) is 0:
    return None
  
  index = aDict.keys()[0]
  count = 0
  
  for i in aDict:
    if len(aDict[i]) > count:
      count = len(aDict[i])
      index = i
    
  return index
  
print biggest({})
  