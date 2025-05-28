# 3D Mannequin Measurement Visualizer

An interactive 3D mannequin visualization tool built with React, Three.js, and TypeScript. This application allows users to adjust various body measurements and see the changes reflected in real-time on a 3D mannequin model.

## Features

- Interactive 3D mannequin that rotates automatically
- Real-time adjustment of body measurements:
  - Height (150-200 cm)
  - Chest (75-120 cm)
  - Waist (60-100 cm)
  - Hips (80-120 cm)
  - Shoulders (35-55 cm)
- Responsive design
- Smooth animations and transitions
- Real-time 3D rendering with Three.js

## Technologies Used

- React
- Three.js
- TypeScript
- Vite
- CSS3

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd 3d-mannequin-fitting
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. The mannequin will automatically rotate to show all angles
2. Use the sliders on the left to adjust different body measurements:
   - Height slider adjusts the overall height
   - Chest slider modifies the upper torso width
   - Waist slider changes the lower torso width
   - Hips slider adjusts the hip and leg area
   - Shoulders slider modifies the shoulder width and arm positions

## Development

The main components of the application are:
- `src/App.tsx`: Contains the main application logic and 3D rendering
- `src/App.css`: Styles for the application

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Three.js for 3D rendering capabilities
- React for the UI framework
- Vite for the build tool and development server
