'''
Find the minumum fixed monthly payment required to pay off a loan using a bisection search
'''

def calc(balance, annualInterestRate):
  monthly_interest_rate = annualInterestRate/12
  monthly_lower_bound = balance/12
  monthly_upper_bound = (balance * (1 + monthly_interest_rate) ** 12)/12
  epsilon = 0.01
  guess = (monthly_lower_bound + monthly_upper_bound)/2
  
  year_end_balance = balance
  
  while abs(year_end_balance) >= epsilon:
    remaining_balance = balance
    
    for i in range(1,13):
      remaining_balance = (remaining_balance - guess) * (1 + monthly_interest_rate)
        
    if (remaining_balance < 0):
      monthly_upper_bound = guess
    else:
      monthly_lower_bound = guess
      
    year_end_balance = remaining_balance
      
    guess = (monthly_lower_bound + monthly_upper_bound)/2
  
  print "Lowest Payment: " + str(round(guess, 2))

#balance = 320000
#annualInterestRate = .2

calc(balance, annualInterestRate)