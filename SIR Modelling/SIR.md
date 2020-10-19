This part of the project was really interesting! The main tool for predicting the effects of
a pandemic on a population is compartmental modelling.

In the case of the SIR model, the progenitor of all the models, we can work out the values for S(Susceptible), I(Infected) and R(Removed) for many different points
in time.

Using Differential Calculus, we can find and defined coefficients for infection and removal rate. These are integral in calculating the
values for S, I and R at different points in time.

Once we have found these values, we obviously have pairs of co-ordinates that can be plotted (t, value of function at given t) on a graph.

Using Python, and associated libraries like numpy and matplotlib, we can find these values, and plot them. This is the purpose of the file
sir.py.

The ODESolver.py file is what does all the calculus for us, and this is something to be tweaked in the future. There are many methods and algorithms that
can be used to solve differential equations, and the method I chose was probably the easiest, 'Forward Euler'. 

We can experiment with different algorithms, like the Backward Euler, or the Gillespie Algorithm. 

With that said, I've attached sir.py and ODESolver.py. If you are to use this, remember to install the necessary packages, like numpy and 
matplotlib. 
