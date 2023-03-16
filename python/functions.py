# # def greet(person):
# #     return f"Hello {person}"

# def divide(a,b):
#     if type(a) is int and type(b) is int:
#         return a/b
#     return 'a and b must be integer!'


# def greet(person):
#     print(f"hello there, {person}")

# def three_things(a,b,c)



def send_email(to_email, from_email, subject, body):
    email = f"""
        to: {to_email}
        from: {from_email}
        subject: {subject}
        --------------------
        body: {body}
        """
        print(email)

send_email(subject="MEOW", to_email="blue@gmail.com", from_email="justin@humans.com", body="Hi jet, your are my cat, I love you!!")