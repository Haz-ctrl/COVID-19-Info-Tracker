**SIR Explanation**
======


This part of the project was really interesting! The main tool for predicting the effects of
a pandemic on a population is compartmental modelling. There are many compartmental models in the Mathematical Epidemeology, like SIR, SIS, MSIR, SIRD, SIZR etc. 

In the case of the SIR model, the progenitor of all the other models, we can work out the values for S(Susceptible), I(Infected) and R(Removed) for many different points in time.

Using Differential Calculus, we can find and define coefficients for the infection and removal rates that a virus has. These are integral in calculating the
values for S, I and R at different points in time.

Once we've obtained values for these three fields at however many points in time, these can be plotted as coordinates on a graph, and so, lines for all three buckets can be drawn, to show the effect of infection and removal rates.

Using Python, and associated libraries like numpy and matplotlib, this system could be implemented. This is the purpose of the file
sir.py.

The ODESolver.py file is what does all the calculus for us, and this is something to be tweaked in the future. There are many methods and algorithms that
can be used to solve differential equations, and the method I chose was probably the easiest, 'Forward Euler'. 

We can experiment with different algorithms, like the Backward Euler, or the Gillespie Algorithm, to solve calculus in the same way. Perhaps a thing for the future.

With that said, I've attached sir.py and ODESolver.py. If you are to use this, remember to install the necessary packages, like numpy and 
matplotlib, before running.

It will work as normal under any Python Interpreter, and the output should include an image being displayed in your native image viewer on your machine.
