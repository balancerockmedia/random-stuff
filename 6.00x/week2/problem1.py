'''
Find the minimum monthly payment and remaining balance after each month,
as well as the total paid and remaining balance after a year
'''

def calc(balance, annualInterestRate, monthlyPaymentRate):
  remaining_balance = balance
  total_paid = 0
  
  for i in range(1,13):
    payment = remaining_balance * monthlyPaymentRate
    interest = (remaining_balance - payment) * (annualInterestRate/12)
    
    remaining_balance = remaining_balance - payment + interest
    total_paid += payment
    
    print "Month: " + str(i)
    print "Minimum monthly payment: " + str(round(payment, 2))
    print "Remaining balance: " + str(round(remaining_balance, 2))
    
  print "Total paid: " + str(round(total_paid, 2))
  print "Remaining balance: " + str(round(remaining_balance, 2))

calc(balance, annualInterestRate, monthlyPaymentRate)