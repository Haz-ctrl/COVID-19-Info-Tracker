#SIR disease model python
#Hashim I.
#18/10/2020

"""
S' = -beta * S * I
I' = beta * S * I - nu * I
R' = nu * I
"""

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

if __name__ == "__main__":

    sir = SIR(0.1, 0.0002, 1500, 1, 0)
    solver = ForwardEuler(sir)
    solver.setInitialConditions(sir.initial_conditions)

    time_steps = np.linspace(0, 60, 1001)
    u, t = solver.solve(time_steps)

    plt.plot(t, u[:, 0], label="Susceptible")
    plt.plot(t, u[:, 1], label="Infected")
    plt.plot(t, u[:, 2], label="Removed")

    plt.title('Population vs Time')
    plt.xlabel('Time (Arbitrary units)')
    plt.ylabel('Number of people')

    plt.legend()
    plt.show()


        