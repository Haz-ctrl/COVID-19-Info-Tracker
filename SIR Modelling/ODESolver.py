#Ordinary Differential Equation solver
#Hashim I.
#18/10/2020

import numpy as np

#OO superclass 
class ODESolver:
    #Any classes inheriting from this superclass must implement the advance() method.

    #Constructor method
    def __init__(self, f):
        #f is defined as the problem we're wanting to solve, which will be defined later.
        self.f = f


    def advance(self):
        #Advance solution one time step.
        raise NotImplementedError
    
    #Establishes the number of eqns. trying to be worked out
    def setInitialConditions(self, U0):
        if isinstance(U0, (int, float)):
            #Scalar ODE (only one to solve)
            self.number_of_equations = 1
            #Make sure initial conditions are expressed as a float, if it isn't already.
            U0 = float(U0)

        else:
            #System of equations
            #Initial conditions is now defined as an array, since there is more than one equation to solve.
            U0 = np.asarray(U0)
            #The number of equations is worked out by looking at the size of this new array
            self.number_of_equations = U0.size

        #Stored within class
        self.U0 = U0


    #Each equation will be solved for multiple time points, hence why time points is taken as an argument.
    def solve(self, time_points):
        #The time points will be held in array t.
        self.t = np.asarray(time_points)
        #Number of time points
        n = self.t.size
        
        #Empty array of the solutions at each time point 
        self.u = np.zeros((n, self.number_of_equations))

        #The first time point in the solution array will be equal to initial conditions.
        self.u[0, :] = self.U0

        #Integrate (aka area under graph) so we just need to multiply by each small time interval
        for i in range(n - 1):
            self.i = i

            #Computing the next step.
            self.u[i + 1] = self.advance()
        
        return self.u[:i+2], self.t[:i+2]


#Subclass that is the simplest method to solve ODEs
class ForwardEuler(ODESolver):

    def advance(self):
        #Solutions, problems, timesteps and time points
        u, f, i, t = self.u, self.f, self.i, self.t
        dt = t[i + 1] - t[i]

        return u[i, :] + dt * f(u[i, :], t[i])
