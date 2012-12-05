'''
Find the minumum fixed monthly payment required to pay off a loan
'''

def calc(balance, annualInterestRate):
  monthly_interest_rate = annualInterestRate/12
  min_monthly_payment = 10
  year_end_balance = balance
  
  while (year_end_balance >= 0):
    min_monthly_payment += 10
    remaining_balance = balance
    
    for i in range(1,13):
      remaining_balance = (remaining_balance - min_monthly_payment) * (1 + monthly_interest_rate)
      
    year_end_balance = remaining_balance
  
  print "Lowest Payment: " + str(round(min_monthly_payment, 2))

calc(balance, annualInterestRate)