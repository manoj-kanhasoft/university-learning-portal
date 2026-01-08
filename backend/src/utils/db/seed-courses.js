import { connectToDatabase } from "../../utils/db/connection.js";
import Courses from "./models/Course.js";
import mongoose from "mongoose";

const seedCourses = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Insert data
    const courses = [
      {
        name: "Introduction to Aerospace Engineering",
        description:
          "Basics of aerospace engineering, including aircraft and spacecraft design.",
        department: "Aerospace Engineering",
        credits: 4,
      },
      {
        name: "Aerodynamics",
        description:
          "Study of the behavior of air as it interacts with solid objects, like aircraft.",
        department: "Aerospace Engineering",
        credits: 3,
      },
      {
        name: "Propulsion Systems",
        description:
          "Overview of propulsion systems used in aircraft and spacecraft.",
        department: "Aerospace Engineering",
        credits: 4,
      },
      {
        name: "Flight Mechanics",
        description:
          "Study of the forces and moments acting on an aircraft during flight.",
        department: "Aerospace Engineering",
        credits: 3,
      },
      {
        name: "Spacecraft Design",
        description:
          "Introduction to the design and engineering of spacecraft systems.",
        department: "Aerospace Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Biomedical Engineering",
        description:
          "Fundamentals of biomedical engineering and its applications in healthcare.",
        department: "Biomedical Engineering",
        credits: 4,
      },
      {
        name: "Biomaterials",
        description: "Study of materials used in medical implants and devices.",
        department: "Biomedical Engineering",
        credits: 3,
      },
      {
        name: "Medical Imaging",
        description: "Techniques and technologies for imaging the human body.",
        department: "Biomedical Engineering",
        credits: 4,
      },
      {
        name: "Biomechanics",
        description:
          "Study of mechanical principles applied to biological systems.",
        department: "Biomedical Engineering",
        credits: 3,
      },
      {
        name: "Biomedical Instrumentation",
        description:
          "Overview of instruments and devices used in medical diagnostics and treatment.",
        department: "Biomedical Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Chemical Engineering",
        description:
          "Fundamentals of chemical engineering principles and processes.",
        department: "Chemical Engineering",
        credits: 4,
      },
      {
        name: "Chemical Reaction Engineering",
        description: "Study of chemical reaction kinetics and reactor design.",
        department: "Chemical Engineering",
        credits: 4,
      },
      {
        name: "Process Dynamics and Control",
        description:
          "Techniques for modeling and controlling chemical processes.",
        department: "Chemical Engineering",
        credits: 3,
      },
      {
        name: "Thermodynamics in Chemical Engineering",
        description:
          "Application of thermodynamic principles to chemical engineering processes.",
        department: "Chemical Engineering",
        credits: 4,
      },
      {
        name: "Separation Processes",
        description:
          "Techniques for separating components in chemical mixtures.",
        department: "Chemical Engineering",
        credits: 3,
      },
      {
        name: "Introduction to Civil Engineering",
        description:
          "Basics of civil engineering, including infrastructure and construction.",
        department: "Civil Engineering",
        credits: 4,
      },
      {
        name: "Structural Analysis",
        description:
          "Study of the forces and loads in structures and their effects.",
        department: "Civil Engineering",
        credits: 4,
      },
      {
        name: "Geotechnical Engineering",
        description:
          "Study of soil and rock mechanics and their applications in construction.",
        department: "Civil Engineering",
        credits: 3,
      },
      {
        name: "Transportation Engineering",
        description:
          "Design and analysis of transportation systems and infrastructure.",
        department: "Civil Engineering",
        credits: 4,
      },
      {
        name: "Water Resources Engineering",
        description: "Techniques for managing and utilizing water resources.",
        department: "Civil Engineering",
        credits: 3,
      },
      {
        name: "Introduction to Computer Engineering",
        description:
          "Basics of computer engineering, including hardware and software integration.",
        department: "Computer Engineering",
        credits: 4,
      },
      {
        name: "Digital Logic Design",
        description: "Study of digital circuits and logic design principles.",
        department: "Computer Engineering",
        credits: 4,
      },
      {
        name: "Computer Architecture",
        description:
          "Overview of computer system architecture and organization.",
        department: "Computer Engineering",
        credits: 3,
      },
      {
        name: "Embedded Systems",
        description:
          "Design and programming of embedded systems and microcontrollers.",
        department: "Computer Engineering",
        credits: 4,
      },
      {
        name: "VLSI Design",
        description:
          "Techniques for designing very-large-scale integration circuits.",
        department: "Computer Engineering",
        credits: 3,
      },
      {
        name: "Introduction to Electrical Engineering",
        description:
          "Fundamentals of electrical engineering including circuits and systems.",
        department: "Electrical Engineering",
        credits: 4,
      },
      {
        name: "Circuit Theory",
        description:
          "Study of electrical circuits, including analysis and design.",
        department: "Electrical Engineering",
        credits: 4,
      },
      {
        name: "Electromagnetics",
        description:
          "Principles of electromagnetics and their applications in electrical engineering.",
        department: "Electrical Engineering",
        credits: 3,
      },
      {
        name: "Power Systems",
        description:
          "Overview of electrical power generation, transmission, and distribution.",
        department: "Electrical Engineering",
        credits: 4,
      },
      {
        name: "Control Systems",
        description:
          "Study of feedback control systems and their applications.",
        department: "Electrical Engineering",
        credits: 3,
      },
      {
        name: "Introduction to Environmental Engineering",
        description:
          "Basics of environmental engineering principles and applications.",
        department: "Environmental Engineering",
        credits: 4,
      },
      {
        name: "Water and Wastewater Treatment",
        description:
          "Techniques for treating and managing water and wastewater.",
        department: "Environmental Engineering",
        credits: 4,
      },
      {
        name: "Environmental Chemistry",
        description:
          "Study of chemical processes in the environment and their impact.",
        department: "Environmental Engineering",
        credits: 3,
      },
      {
        name: "Air Pollution Control",
        description: "Principles and methods for controlling air pollution.",
        department: "Environmental Engineering",
        credits: 3,
      },
      {
        name: "Solid Waste Management",
        description:
          "Techniques and systems for managing solid waste and recycling.",
        department: "Environmental Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Industrial Engineering",
        description:
          "Fundamentals of industrial engineering and its applications in manufacturing and service industries.",
        department: "Industrial Engineering",
        credits: 4,
      },
      {
        name: "Operations Research",
        description:
          "Techniques for optimizing complex systems and processes using mathematical models.",
        department: "Industrial Engineering",
        credits: 4,
      },
      {
        name: "Production Planning and Control",
        description:
          "Study of methods for planning and controlling production processes.",
        department: "Industrial Engineering",
        credits: 3,
      },
      {
        name: "Quality Engineering",
        description:
          "Principles and practices for ensuring and improving product quality.",
        department: "Industrial Engineering",
        credits: 3,
      },
      {
        name: "Human Factors Engineering",
        description:
          "Study of designing systems and products to optimize human performance and safety.",
        department: "Industrial Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Mechanical Engineering",
        description:
          "Basics of mechanical engineering, including mechanics, thermodynamics, and materials.",
        department: "Mechanical Engineering",
        credits: 4,
      },
      {
        name: "Thermodynamics",
        description:
          "Study of heat transfer, energy conversion, and thermodynamic systems.",
        department: "Mechanical Engineering",
        credits: 4,
      },
      {
        name: "Fluid Mechanics",
        description: "Principles of fluid behavior and dynamics.",
        department: "Mechanical Engineering",
        credits: 3,
      },
      {
        name: "Heat Transfer",
        description:
          "Techniques and principles for the transfer of heat in various systems.",
        department: "Mechanical Engineering",
        credits: 3,
      },
      {
        name: "Mechanical Design",
        description:
          "Study of design principles and practices for mechanical systems and components.",
        department: "Mechanical Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Software Engineering",
        description:
          "Fundamentals of software engineering, including software development methodologies and lifecycle.",
        department: "Software Engineering",
        credits: 4,
      },
      {
        name: "Software Design and Architecture",
        description:
          "Principles of designing and structuring software systems.",
        department: "Software Engineering",
        credits: 4,
      },
      {
        name: "Software Testing and Quality Assurance",
        description:
          "Techniques for testing software and ensuring its quality.",
        department: "Software Engineering",
        credits: 3,
      },
      {
        name: "Agile Software Development",
        description:
          "Study of agile methodologies and practices for software development.",
        department: "Software Engineering",
        credits: 3,
      },
      {
        name: "Database Systems",
        description:
          "Introduction to database design, management, and querying.",
        department: "Software Engineering",
        credits: 4,
      },
      {
        name: "Introduction to Structural Engineering",
        description:
          "Basics of structural engineering, including the design and analysis of structures.",
        department: "Structural Engineering",
        credits: 4,
      },
      {
        name: "Structural Analysis",
        description:
          "Study of forces and moments in structural systems and their effects.",
        department: "Structural Engineering",
        credits: 4,
      },
      {
        name: "Concrete Design",
        description: "Design principles for reinforced concrete structures.",
        department: "Structural Engineering",
        credits: 3,
      },
      {
        name: "Steel Design",
        description:
          "Principles of designing steel structures, including analysis and design techniques.",
        department: "Structural Engineering",
        credits: 4,
      },
      {
        name: "Earthquake Engineering",
        description:
          "Study of the effects of seismic activity on structures and methods for mitigating damage.",
        department: "Structural Engineering",
        credits: 3,
      },
    ];

    await Courses.insertMany(courses);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

seedCourses();
