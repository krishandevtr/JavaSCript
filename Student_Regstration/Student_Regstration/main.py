# Import necessary classes from Tkinter and PIL
from tkinter import *
from PIL import Image, ImageTk
from tkinter import messagebox

# Create an object of the Tk class
window = Tk()

#function for the command in the login button
def login():
    if username_entry.get() == '' or password_entry.get() == '':
        messagebox.showerror('Error',"Fields cannot be empty")
    elif username_entry.get() =="krishnadev" and password_entry.get() == '1234':
         messagebox.showinfo('Success','welcome')

         # Once we got the second page there is no need to keeping the login page ,so destroy that
         window.destroy()

         # This is used to run the all code in the sms file so that user can see the next page
         import sms



# Set the width and the height of the window
window.geometry("1200x700+0+0")
window.resizable(False, False)

#Set the titile
window.title("Login-Student Management System")

# Load and set the background image
background_image = ImageTk.PhotoImage(file="images/bg.jpg")
bg_color = Label(window, image=background_image,pady=10)
bg_color.place(x=0, y=0)

# Create a frame to hold other widgets
login_frame = Frame(window,bg='white')
login_frame.place(x=400, y=150)

# Load and set the logo image
logo_image = ImageTk.PhotoImage(file="images/logo.png")
logo_label = Label(login_frame, image=logo_image)
logo_label.grid(row=0, column=0,columnspan=2)

# Load and set the user image
user_image = ImageTk.PhotoImage(file="images/user.png")
username_label = Label(login_frame, image=user_image, text="Username", compound=LEFT,
                       font=("times new roman", 20, 'bold'),bg='white',bd=5,fg='royalblue')
username_label.grid(row=1, column=0,pady=10,padx=20)

# Create an entry widget for username input
username_entry = Entry(login_frame,font=("times new roman", 20, 'bold'))
username_entry.grid(row=1, column=1,pady=10,padx=20)

# Load and set the password image
password_image = ImageTk.PhotoImage(file="images/password.png")
password_label = Label(login_frame, image=password_image, text="Password", compound=LEFT,
                       font=("times new roman", 20, 'bold'),bg='white',bd=5,fg='royalblue')
password_label.grid(row=2, column=0,pady=10,padx=20)

# Create an entry widget for password input
password_entry = Entry(login_frame, font=("times new roman", 20, 'bold'), show='#')
password_entry.grid(row=2, column=1, pady=10, padx=20)


# Create a button to submit and hovering effect to button
login_btn = Button(login_frame,text="login",font=("times new roman", 14, 'bold'),width=15
                   ,fg='white',bg='cornflowerblue',activebackground='cornflowerblue',activeforeground='white',
                   cursor='hand2',command=login)
login_btn.grid(row=3,column=1)


# Keep the window open
window.mainloop()

# Starting new page with after login users click on the alert box ,user goanna see the below page


