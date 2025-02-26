from tkinter import *
import time
import ttkthemes
from tkinter import ttk
from tkinter import messagebox
# import pymysql
# Mention all function
def clock():
    date= time.strftime('%d/%m/%Y')
    current_time = time.strftime("%H:%M:%S")

    # Change the properties of a widget after it has been created
    data_time_label.config(text=f'  Date:{date}\nTime:{current_time}')

    # After() method is used to schedule a function to be called after a specified amount of time (in milliseconds).
    data_time_label.after(1000,clock)

count =0
text =''
def slider():
    # Make the variable globall then only you can update
    global text,count
    if count == len(s):
        count =0
        text = ''

    text +=s[count]
    slider_label.config(text=text)
    count +=1
    slider_label.after(300,slider)
    
    def connect():
            con = pymysql.connect(host=host_entry.get(),user=username_entry.get(),password=password_entry().get())
def connect_DB():


        connect_window = Toplevel()
        connect_window.geometry('470x250+730+230')
        connect_window.title("DataBase Connection")
        connect_window.resizable(0,0)
        
        host_name_label = Label(connect_window,text="Host Name",font=('arial',20,'bold'))
        host_name_label.grid(row=0,column=0)
        
        host_entry = Entry(connect_window,font=('roman',15,'bold'),bd=2) 
        host_entry.grid(row=0,column=1,padx=40,pady=20)
        
        username_label = Label(connect_window,text="Username",font=('arial',20,'bold'))
        username_label.grid(row=1,column=0)
        
        username_entry = Entry(connect_window,font=('roman',15,'bold'),bd=2) 
        username_entry.grid(row=1,column=1,padx=40,pady=20)

        password_label = Label(connect_window,text="Password",font=('arial',20,'bold'))
        password_label.grid(row=2,column=0)
        
        password_entry = Entry(connect_window,font=('roman',15,'bold'),bd=2) 
        password_entry.grid(row=2,column=1,padx=40,pady=20)
        
        connect_button = ttk.Button(connect_window,text="Button")
        connect_button.grid(row=3,columnspan=2,command=connect)

        

# Call the  main method ,To initialize the root window
# Change the Tk() To ttkthemes.ThemedTk() ,This contians the themes that can apply to the Buttons
root = ttkthemes.ThemedTk()

# Get all themes in the ttkthemes Class
root.get_themes()

# set the theme to the body
root.set_theme('radiance')

# Set the width and the height of the window
root.geometry("1200x700+0+0")

# Disibale the button to resize
root.resizable(False, False)

# Display the current time
data_time_label = Label(root,text='Hello',font=("times new roman",18,'bold'))
data_time_label.place(x=5,y=5)
clock()

# This is used to replace the s in the Label constructor
s= "Student Management System "

# slider label for the result
slider_label = Label(root,text=s,font=("arial",28,'italic bold'),width=30)

# Place the stuf in the root
slider_label.place(x=200,y=5)
slider()

# Connect db button
connect_button = ttk.Button(root,text= 'Connect Databse',width=20,command=connect_DB)
connect_button.place(x=1000,y=0)

# left_frame
left_frame = Frame(root)
left_frame.place(x=50,y=80,width= 300,height=600)

#logo image
logo_image = PhotoImage(file='images/students (1).png')
logo_label = Label(left_frame,image=logo_image)
logo_label.grid(row=0,column=0)

# add student button
add_student_button = ttk.Button(left_frame,text='Add student',width=25)
add_student_button.grid(row=1,column=0,pady=20)

# Search student button
search_student_button = ttk.Button(left_frame,text='Search student',width=25)
search_student_button.grid(row=2,column=0,pady=20)

# Delete student button
delete_student_button = ttk.Button(left_frame,text='delete student',width=25)
delete_student_button.grid(row=3,column=0,pady=20)

# update student button
update_student_button = ttk.Button(left_frame,text='Update student',width=25)
update_student_button.grid(row=4,column=0,pady=20)

# show student button
show_student_button = ttk.Button(left_frame,text='Show student',width=25)
show_student_button.grid(row=5,column=0,pady=20)

# Export student button
export_student_button = ttk.Button(left_frame,text='Export student',width=25)
export_student_button.grid(row=6,column=0,pady=20)

# exit student button
exit_student_button = ttk.Button(left_frame,text='Exit',width=25)
exit_student_button.grid(row=7,column=0,pady=20)

# Right frame setup
right_frame = Frame(root)
right_frame.place(x=350, y=80, width=820, height=600)

# Treeview setup (slightly smaller than the frame)
student_table = ttk.Treeview(right_frame,
                              columns=('Id', 'Name', 'Mobile No', 'Email', 'Address', 'Gender', 'D.O.B', 'Added Date', 'Added Time'),
                              show='headings')

# Adjust the width and height slightly smaller than the right_frame
student_table.pack( fill='both', expand=1, padx=(0, 20), pady=(0, 0))  # Adding right padding

# Scrollbars
scrollbar_x = Scrollbar(right_frame, orient='horizontal', command=student_table.xview)
scrollbar_y = Scrollbar(right_frame, orient='vertical', command=student_table.yview)

# Pack the scrollbars
scrollbar_x.pack(side='bottom', fill='x')
scrollbar_y.pack(side='right', fill='y')

# Link scrollbars to the Treeview
student_table.config(xscrollcommand=scrollbar_x.set, yscrollcommand=scrollbar_y.set)
scrollbar_x.config(command=student_table.xview)
scrollbar_y.config(command=student_table.yview)

# Heading in the Treeview
student_table.heading('Id',text='Id')
student_table.heading('Name',text='Name')
student_table.heading('Mobile No',text='Mobile No')
student_table.heading('Email',text='Email')
student_table.heading('Address',text='Address')
student_table.heading('Gender',text='Gender')
student_table.heading('D.O.B',text='D.O.B')
student_table.heading('Added Date',text='Added Date')
student_table.heading('Added Time',text='Added Time')

student_table.config(show='headings')

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END OF PART TWO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



# Main loop to see the root window
root.mainloop()

