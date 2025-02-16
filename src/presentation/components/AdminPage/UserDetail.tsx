import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Student } from "../../../core/domain/entity/Student.entity";
import { StudentRepositoryContext } from "../../../core/application/context/StudentRepositoryContext";
import {CURRENT_BASE_URL_image} from '../../../constants/constants'
const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const StudentRepository = useContext(StudentRepositoryContext);
  const [activeTab, setActiveTab] = useState("academic");
  const [user, setUser] = useState<Student | null>(null); // Change this line  const [activeTab, setActiveTab] = useState("academic");
  const transformStudentData = (data: any): Student => ({
    id: data.Id,
    name: data.Name,
    fatherName: data.FatherName,
    motherName: data.MotherName,
    gender: data.Gender,
    email: data.Email,
    phoneNo: data.PhoneNo,
    imageUrl: data.ImageUrl,
    faculty:data.Faculty,
    semester:data.Semester,
    dob:data.DoB,
  });
  useEffect(() => {
  const fetchData = async () => {
    try {
      if (id) {
        const fetchedUser = await StudentRepository?.getStudentDateById(id);
        if (fetchedUser?.succeeded && fetchedUser?.data) {
          const formattedData = transformStudentData(fetchedUser.data); // Change this to a single object, not an array
          setUser(formattedData);
          console.log(formattedData);
        } else {
          console.error("Failed to fetch user data or invalid response:", fetchedUser);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchData();
}, [id, StudentRepository]);

  if (!user) {
    return <p>User not found!</p>;
  }

  // Dummy data for tabs
  const academicData = {
    course: "BCA",
    gpa: 4.0,
    joined: 2017,
    ended: 2022,
    semester: "6th",
    scholarship: "Gold",
  };

  const ccaData = {
    activities: "Debate, Music Club, Football Team",
    awards: "Best Debater 2021",
  };

  const projectsData = [
    { title: "E-commerce Website", year: 2021 },
    { title: "Library Management System", year: 2022 },
  ];

  const certificationsData = [
    { name: "React Development", issuer: "Udemy", year: 2022 },
    { name: "Python for Data Science", issuer: "Coursera", year: 2021 },
  ];

  const linkedInProfile = "https://linkedin.com/in/user-profile";

  return (
    <div className="p-8 bg-white h-[80%] border-2 rounded-xl shadow-2xl min-h-screen">
      {/* User Info */}
      <div className="flex items-center bg-white shadow-md p-6 rounded-md mb-6">
        <img
          src={`${CURRENT_BASE_URL_image}/` + `${user.imageUrl}`}
          
          alt={user.name}
          className="rounded-full h-32 w-32 mr-8"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNo}
          </p>
          <p>
            <strong>Father's Name:</strong> {user.fatherName}
          </p>
          <p>
            <strong>Faculty:</strong> {user.faculty || "N/A"}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-red-500 shadow-md rounded-md">
        <div className="flex justify-center items-center rounded-t-md bg-background border-b">
          {["academic", "cca", "projects", "certifications", "linkedin"].map(
            (tab, index, allTabs) => (
              <button
                key={tab}
                className={`px-[48px] py-[20px] w-full text-center transition-all duration-100 ${
                  activeTab === tab ? "bg-primary text-white" : "text-primary"
                } ${index === 0 ? "rounded-tl-md" : ""} ${
                  index === allTabs.length - 1 ? "rounded-tr-md" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "academic" && (
            <div>
              <h3 className="font-bold mb-2">Academic Details</h3>
              <p>Section: {academicData.course}</p>
              <p>GPA: {academicData.gpa}</p>
              <p>Joined: {academicData.joined}</p>
              <p>Ended: {academicData.ended}</p>
              <p>Semester: {academicData.semester}</p>
              <p>Scholarship: {academicData.scholarship}</p>
            </div>
          )}

          {activeTab === "cca" && (
            <div>
              <h3 className="font-bold mb-2">CCA/ECA Activities</h3>
              <p>Activities: {ccaData.activities}</p>
              <p>Awards: {ccaData.awards}</p>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h3 className="font-bold mb-2">Projects</h3>
              <ul>
                {projectsData.map((project, index) => (
                  <li key={index}>
                    {project.title} ({project.year})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "certifications" && (
            <div>
              <h3 className="font-bold mb-2">Certifications</h3>
              <ul>
                {certificationsData.map((certification, index) => (
                  <li key={index}>
                    {certification.name} ({certification.year}) from{" "}
                    {certification.issuer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "linkedin" && (
            <div>
              <h3 className="font-bold mb-2">LinkedIn Profile</h3>
              <a
                href={linkedInProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
