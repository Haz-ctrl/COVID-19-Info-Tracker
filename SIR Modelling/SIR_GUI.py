#SIR disease model python
#Hashim I.
#18/10/2020

"""
S'(t) = -beta * SI
I'(t) = beta * SI - nu * I
R'(t) = nu * I
"""

'''
Dependencies:
Tkinter for implementing UI elements
Numpy for creating arrays along certain scales.
ODESolver which does the calculus and creates differential equations.
Matplotlib to plot the graph based on the solutions for each time point.
'''

from tkinter import *
import numpy as np
from ODESolver import ForwardEuler
from matplotlib import pyplot as plt

#OO Class for modelling
class SIR:
    def __init__(self, nu, beta, S0, I0, R0):

        """
        beta is the infection rate (i.e rate of transfer from S to I)
        nu is the removal rate (i.e rate of transfer from I to R)
        S0, I0 and R0 all reference the initial values at time 0 for S, I and R.

        """

        if isinstance(nu, (float, int)):
            #Is it a number?
            self.nu = lambda t: nu
        elif callable(nu):
            self.nu = nu

        if isinstance(beta, (float, int)):
            #Is it a number?
            self.beta = lambda t: beta
        elif callable(beta):
            self.beta = beta

        self.initial_conditions = [S0, I0, R0]

    def __call__(self, u, t):

        #Get solutions for S, I and R
        S, I, _ = u

        return np.asarray([
            #Susceptible 
            -self.beta(t) * S * I,

            #Infected 
            self.beta(t) * S * I - self.nu(t) * I,

            #Removed
            self.nu(t) * I
        ])


#Creates a tkinter window
master = Tk()
master.geometry('500x500')

#Setting the title of the window.
master.title('COVID-19 SIR modeller')

#Creates a canvas, where our elements will be pushed to.
canvas = Canvas(master, width=400, height=500)
canvas.pack()

#Creates a title and configures the font size and boldness, pushing it to the canvas.
title = Label(master, text='COVID-19 SIR modeller')
title.config(font = ('Sans-serif', 28, 'bold'))
canvas.create_window(200, 50, window=title)

#Creating a beta label and entry box, pushing them to the canvas.
infectionRate = Label(master, text='β (Infection Rate %): ')
canvas.create_window(100, 150, window=infectionRate)
infectionEntry = Entry(master, bd=3, width=10)
canvas.create_window(300, 150, window=infectionEntry)

#Creating labels and entry fields for the other things, pushed to the canvas once done. 
initialS_label = Label(master, text='Initial susceptible population: ') 
initialI_label = Label(master, text='Initial infected population: ') 
initialS_entry = Entry(master, bd=3, width=10) 
initialI_entry = Entry(master, bd=3, width=10)

canvas.create_window(100, 200, window=initialS_label)
canvas.create_window(100, 250, window=initialI_label)
canvas.create_window(300, 200, window=initialS_entry)
canvas.create_window(300, 250, window=initialI_entry)

scale_label = Label(master, text='Time scale (Days): ')
scale_entry = Entry(master, bd=3, width = 10)
canvas.create_window(100, 300, window=scale_label)
canvas.create_window(300, 300, window=scale_entry)

#Initialises the graph once the data has been entered by the user
def initialiseGraph():

    #The text fields are of 'str' type, so they need to be converted.#
    beta = float(infectionEntry.get())
    scale = int(scale_entry.get())
    s = int(initialS_entry.get())
    i = int(initialI_entry.get())

    #Creating instances of the classes
    sir = SIR(0.1, beta/100, s, i, 0)
    solver = ForwardEuler(sir)
    solver.setInitialConditions(sir.initial_conditions)

    time_steps = np.linspace(0, scale, 1000)
    u, t = solver.solve(time_steps)

    #Plot the points on the graph
    plt.plot(t, u[:, 0], label="Susceptible")
    plt.plot(t, u[:, 1], label="Infected")
    plt.plot(t, u[:, 2], label="Removed")

    plt.title('Population vs Time')
    plt.xlabel('Time (Days)')
    plt.ylabel('Number of people')

    plt.legend()
    plt.show()

    #Clear the text fields
    infectionEntry.delete(0, END)
    initialS_entry.delete(0, END)
    initialI_entry.delete(0, END)

#Button to generate the graph, which will also call the function above.
generate = Button(master, text='Generate Graph', command=initialiseGraph)
canvas.create_window(200, 375, window=generate)

#Button which will quit the program when pressed.
quitButton = Button(master, text='Exit Program', command=master.quit)
canvas.create_window(200, 425, window=quitButton)

#This pretty much tells our tkinter window to stop listening and quit execution.
master.mainloop()