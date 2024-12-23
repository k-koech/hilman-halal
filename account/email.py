from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_reset_password(username,password,receiver):
    # Creating message subject and sender
    subject = 'Password Reset'
    sender = 'noreply@nairobidevops.org'

    #passing in the context vairables
    html_content = render_to_string('send_password/sendpassword.html',{"username": username,  "password":password})
    text_content = render_to_string('send_password/sendpassword.txt',{"username": username, "password":password})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()



def send_staff_credentials(username,password,receiver):
    # Creating message subject and sender
    subject = 'IMPORTANT: Nairobi Devops staff credentials'
    sender = 'noreply@nairobidevops.org'

    #passing in the context vairables    
    html_content = render_to_string('newuser/credentials.html',{"username": username,  "password":password})
    text_content = render_to_string('newuser/credentials.txt',{"username": username, "password":password})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()

def send_subscription(receiver):
    # Creating message subject and sender
    subject = 'Nairobi Devops Subscription'
    sender = 'noreply@nairobidevops.org'

    #passing in the context vairables    
    html_content = render_to_string('subscriber/subscriber.html',{})
    text_content = render_to_string('subscriber/subscriber.txt',{})

    msg = EmailMultiAlternatives(subject,text_content,sender,[receiver])
    msg.attach_alternative(html_content,'text/html')
    msg.send()


def send_message(name, subject,message,email):
    sender = 'noreply@nairobidevops.org'

    #passing in the context vairables    
    html_content = render_to_string('sendmessage/sendmessage.html',{"name": name,  "email": email,"subject": subject, "message":message})
    text_content = render_to_string('sendmessage/sendmessage.txt',{"name": name, "email": email,"subject": subject, "message":message})

    msg = EmailMultiAlternatives(subject,text_content,sender,[email])
    msg.attach_alternative(html_content,'text/html')
    msg.send()
  
def partner_message(name, message,email):
    sender = 'noreply@nairobidevops.org'
    subject = "IMPORTANT: Partnership"
    cc_list = ['info@nairobidevops.org']  # List of CC recipients
    company_email = "info@nairobidevops.org"

    html_content = render_to_string('partner/partner.html',{"name": name,"senders_email":email,  "email": company_email,"subject": subject, "message":message, "cc":cc_list})
    text_content = render_to_string('partner/partner.txt',{"name": name,"senders_email":email,  "email": company_email,"subject": subject, "message":message, "cc":cc_list})

    msg = EmailMultiAlternatives(subject,text_content,sender,[email])
    msg.attach_alternative(html_content,'text/html')
    msg.send()
