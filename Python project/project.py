import numpy as np
from scipy.signal import fftconvolve
from scipy.optimize import minimize
import matplotlib.pyplot as plt

c = 343.0


mic_positions = np.array([
    [0.02, 0.02, 0],      # Mic 1 (Top-Right on face)
    [-0.02, 0.02, 0],     # Mic 2 (Top-Left on face)
    [-0.02, -0.02, 0],    # Mic 3 (Bottom-Left on face)
    [0.02, -0.02, 0],     # Mic 4 (Bottom-Right on face)
    [0, 0, -0.04],        # Mic 5 (Center-Back)
    [0, 0, -0.06]         # Mic 6 (Backside strap)
])

def generate_gunshot_signal(duration, sample_rate):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    gunshot = np.sin(2 * np.pi * 1000 * t) * np.exp(-t * 10)
    return gunshot


def generate_signals(source_position, mic_positions, sample_rate, duration):
    num_mics = mic_positions.shape[0]
    signals = []
    gunshot = generate_gunshot_signal(duration, sample_rate)
    
    for mic in mic_positions:
        distance = np.linalg.norm(source_position - mic)
        time_delay = distance / c
        samples_delay = int(time_delay * sample_rate)
        signal = np.pad(gunshot, (samples_delay, 0), 'constant')[:len(gunshot)]
        signals.append(signal)
        
    return np.array(signals)

# GCC-PHAT 
def gcc_phat(sig, refsig, fs):
    n = sig.shape[0] + refsig.shape[0]
    SIG = np.fft.rfft(sig, n=n)
    REFSIG = np.fft.rfft(refsig, n=n)
    R = SIG * np.conj(REFSIG)
    cc = np.fft.irfft(R / np.abs(R), n=(n))
    max_shift = int(fs / 2)
    cc = np.concatenate((cc[-max_shift:], cc[:max_shift+1]))
    shift = np.argmax(np.abs(cc)) - max_shift
    tdoa = shift / float(fs)
    return tdoa

# NLS 
def estimate_position(TDOAs, mic_positions):
    def error_function(position):
        estimated_TDOAs = []
        for i in range(1, len(mic_positions)):
            dist1 = np.linalg.norm(position - mic_positions[0])
            dist2 = np.linalg.norm(position - mic_positions[i])
            estimated_TDOAs.append((dist1 - dist2) / c)
        return np.sum((np.array(estimated_TDOAs) - TDOAs) ** 2)

    initial_guess = np.array([0, 0, 0])
    result = minimize(error_function, initial_guess, method='L-BFGS-B')
    return result.x

# Simulation parameters
sample_rate = 48000  # Sampling rate in Hz
duration = 0.01      # Signal duration in seconds
source_position = np.array([1.0, 1.0, 0.5])  # True position of the source


signals = generate_signals(source_position, mic_positions, sample_rate, duration)

TDOAs = []
for i in range(1, len(mic_positions)):
    tdoa = gcc_phat(signals[i], signals[0], sample_rate)
    TDOAs.append(tdoa)

estimated_position = estimate_position(np.array(TDOAs), mic_positions)

azimuth = np.arctan2(estimated_position[1], estimated_position[0])
elevation = np.arcsin(estimated_position[2] / np.linalg.norm(estimated_position))

print(f"Estimated Position: {estimated_position}")
print(f"Azimuth: {np.degrees(azimuth)} degrees")
print(f"Elevation: {np.degrees(elevation)} degrees")

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(mic_positions[:, 0], mic_positions[:, 1], mic_positions[:, 2], c='r', marker='o', label='Microphones')
ax.scatter(source_position[0], source_position[1], source_position[2], c='g', marker='x', label='True Source')
ax.scatter(estimated_position[0], estimated_position[1], estimated_position[2], c='b', marker='^', label='Estimated Source')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.legend()
plt.show()
