for i , d in enumerate(['A','B']):
    print(i,'->',d)




names = ["Alice", "Bob", "Charlie"]
ages = [24, 50, 18]

# Loop through both lists and track the index starting at 1
for i, (name, age) in enumerate(zip(names, ages), start=1):
    print(f"{i}. {name} is {age} years old.")
