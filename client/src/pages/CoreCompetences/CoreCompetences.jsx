import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CoreCompetences.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const CoreCompetences = () => {
    



  const behave1 = [
    // 1

    "We expect to win and work together to generate results, striving to simplify and innovate, learning from our failures and willing to break with the past when necessary to move forward.",
    "We take action, building cross-functional relationships for a holistic view of the company and look for opportunities for improvement, willing to sacrifice in one area if it leads to our overall success.",
    "We behave ethically, being transparent and sharing information about the factors that influence our actions, aligning our behavior with our values, and ensuring that our products contribute to making the world a better place.",
    "Create opportunities for all: success brings opportunities, where everyone is respected and included, and we work to provide opportunities for all associates to reach their full potential.",
    "Written/verbal communication and listening for a manager involves conveying information effectively, understanding and processing information received, and fostering open and collaborative communication at all levels of the organization.",
    "Interpersonal and relationship skills are essential to ensure effective leadership and successful team management. ",
    'Teamwork and collaboration" in a manager relates to the ability to lead, communicate, build relationships and cooperate at different levels within the organization in order to achieve efficient production, quality products and a positive work environment.',
    'Results-oriented" in a manager implies the ability to define, plan, execute and achieve concrete and measurable objectives in the field of textile production and manufacturing, while maintaining a focus on efficiency, quality and continuous improvement.',
    "Adaptability in a manager refers to the ability to adjust strategies, processes and approaches in response to changes in the work, technological, economic and regulatory environment. This competency is essential to maintain efficiency, competitiveness and quality in a constantly changing business environment.",
    "It focuses on ensuring that the organization is committed to providing excellent customer service and meeting customer expectations across all Hanes Brands operations. This will not only increase customer satisfaction, but can also drive organizational growth and profitability.",
  ];

  const category1 = [
    "Play to Win",
    "Act Like Owners",
    "Do Whats Right",
    "Create Opportunity for All",
    "Written/verbal communication and listening",
    "Interpersonal and Relationship skills",
    "Teamwork and collaboration",
    "Results-oriented",
    "Adaptability",
    "Customer Centricity",
  ];
  const category2 = [
    "Performance Managment",
    "Develop and Impliment Operational Strategies",
    "Collaboration and Interfunctional Coordination",
    "Communication and Collaboration",
    "Objective Managment and Goal Monitoring",
    "Innovation and Technology Adoption",
    "Critical Thinking and Problem Solving",
    "Project Management",
  ];
  const category3 = [
    "Implementation of Product Quality Strategies",
    "Quality Control Processes and Procedures",
    "Work with Cross-Functional Teams",
    "Identification and Implementation of Process Improvements",
    "Identification and Resolution of Quality Issues",
    "Updating and Innovating Product Quality",
  ];
  const category4 = [
    "Development and Implementation of Strategies",
    "Supplier Relationship Management",
    "Supplier Evaluation and Management",
    "Collaborate with Cross-Functional Teams",
    "Benchmarking and Best Practices",
    "Effectively Manage Budget and Allocate Resources",
    "Compliance with Policies and Regulations",
  ];
  const category5 = [
    "Oversee Financial Operations",
    "Provide Strategic Financial Guidance to the Executive Team",
    "Financial Policies and Procedures",
    "Preparation of Financial Analysis",
    "Cash Flow Management and Capital Requirements",
    "Financial Performance Analysis",
  ];
  const category6 = [
    "Strategic Plan Management",
    "Supplier Management",
    "Production Management",
    "Logistics Management",
    "Risk Management",
    "Multifunctional and Relationships",
    "Regulatory Compliance",
    "Budget Management",
    "Continuous Improvement Processes",
  ];
  const category7 = [
    "Leading and Managing Teams",
    "Management of Corporate Procedures",
    "Development and Execution of Production Plans",
    "Evalutation of Production Processes",
    "Development and implementation of Quality Control Procedures",
    "Risk Management",
  ];

  const behave2 = [
    // 2
    "Manage the development of operational plans and budgets, including tracking and reporting on performance against established metrics.",
    "Develop and implement operational strategies that support the companys business objectives, including cost reduction, quality improvement and customer satisfaction.",
    "Develop and maintain relationships with internal stakeholders, including supply chain, logistics, production and customer service teams, to ensure operational strategies are aligned with business objectives.",
    "Develop and implement effective communication and reporting strategies to keep stakeholders informed and engaged throughout the operational lifecycle.",
    "Conduct periodic operational reviews to identify opportunities for improvement and monitor progress against established goals and objectives.",
    "Stays current with operations trends and technologies to ensure that the companys operating practices are in line with changing requirements.",
    "Strong problem solving skills, with the ability to identify and address complex operational issues in a fast-paced, dynamic environment.",
    "Demonstrated ability to manage large scale projects and initiatives.",
  ];

  const behave3 = [
    // 3
    "Plays a key role in improving product quality, and regulatory compliance and customer satisfaction and ability to implement effective product quality strategies.",
    "Develops and implements effective quality control processes and procedures, including incoming inspection, in-process inspection and final inspection to meet required quality standards for each business unit.",
    "Collaborates with cross-functional teams, including product development, manufacturing, supply chain and customer service, to ensure quality objectives are integrated into production and product development processes.",
    "Identifies and implements process improvements and best practices to drive product quality and continuous improvement and perform role effectively.",
    "Conducts periodic product quality reviews to identify opportunities for improvement and monitor progress against established goals and objectives.",
    "Manages innovation and upgrade product quality technologies.",
  ];

  const behave4 = [
    // 4
    "Develops and implements strategies and plans that optimize processes, reduce costs and improve efficiency throughout the operation.",
    "Supply chain management, working effectively with suppliers and ensuring timely and cost effective delivery of goods and services. This requires negotiation skills, relationship management, risk analysis and a constant focus on continuous improvement.",
    "Strategic leader who has a focus on efficiency, quality, sustainability and risk management in the supply chain. In addition, must be proficient in supplier evaluation and management, as well as negotiating beneficial agreements in operations.",
    "Must be a leader who combines technical, financial and communication skills to collaborate effectively with cross-functional teams and support procurement and sourcing efforts strategically and efficiently.",
    "Must be proactive in their pursuit of industry knowledge and trends, be able to identify and apply best practices, and be committed to continuous improvement across all business units of the operation.",
    "Efficiently manage budget and effective resource allocation, combining analytical, strategic planning and vendor management skills to achieve the organizations financial objectives.",
    "Ensure compliance with policies and regulations, while promoting ethical and efficient practices in the procurement and sourcing process. the ability to develop sound policies, train staff and manage risks is essential to effectively fulfill this role.",
  ];

  const behave5 = [
    // 5
    "Oversees all financial operations including accounting, financial reporting, budgeting, forecasting, tax planning and compliance.",
    "Provides strategic financial guidance to the executive team and the board of directors to support decision making and drive business growth",
    "Develops and implements financial policies, procedures and controls to ensure compliance with accounting rules, regulations and best practices",
    "Prepares and presents financial reports, analysis and insights to senior management and the board of directors, identifying opportunities and risks to the business",
    "Manages cash flow and capital requirements to ensure financial stability and growth of the business",
    "Monitors and analyzes financial performance against budget and forecast, identifying opportunities to improve performance and driving actions to address issues",
  ];

  const behave6 = [
    // 6
    "Develops and implements a strategic supply chain plan that aligns with company goals and objectives. Performs role effectively and contributes to the success of the company in achieving its regional goals and objectives.",
    "Oversees procurement activities including supplier selection, contract negotiation and purchasing processes. ",
    "Manages production operations to ensure that products are manufactured in a timely, cost effective manner and meet quality standards.",
    "Ensures that the logistics function is operating efficiently and effectively, including transportation, warehousing and distribution.",
    "Manages risk throughout the supply chain, including contingency planning and risk mitigation strategies.",
    "Fosters strong relationships with key suppliers, customers and other stakeholders.",
    "Ensures compliance with all relevant regulations and standards.                                             ",
    "Develops and manages the supply chain budget and performance metrics",
    "Ensures continuous improvement in all supply chain processes and identify opportunities to save costs and improve efficiency.",
  ];

  const behave7 = [
    // 7
    "Leads and manages the production process engineering team to optimize manufacturing processes and increase efficiencies",
    "Develops and maintains process documentation, including standard operating procedures and work instructions, to ensure consistent processes and products.",
    "Develops and executes production plans, schedules, and budgets, ensuring on-time delivery of high quality products.",
    "Evaluates production processes, identify areas of improvement and implement process improvements to improve overall production efficiency.",
    "Works closely with the quality team to develop and implement quality control procedures, ensuring compliance with quality standards and regulations.",
    "Identifies and manages risks associated with production processes and develop and implement risk mitigation plans.",
  ];




  return (
    <div className="survey-containers">
      <Navbar />

      <div className="top-contain">
        <div className="data-title-all">
          <label>All</label>
        </div>
        <div className="data-title-1-2">
          <label>Position 1/2</label>
        </div>
        <div className="data-title-3">
          <label>Position 3</label>
        </div>
        <div className="data-title-4">
          <label>Position 4</label>
        </div>
      </div>

      <div className="bottoms-container">
        <div className="data-title-5">
          <label>Position 5</label>
        </div>
        <div className="data-title-6">
          <label>Position 6</label>
        </div>
        <div className="data-title-7">
          <label>Position 7</label>
        </div>
      </div>

      <div className="container5">
        <table>
          <thead>
            <tr>
              <th className="topContainerTable" colspan="2">
                <h1>
                  Core Competencies
                  <br></br>
                  Central Office
                </h1>{" "}
              </th>

              <th className="rotated-title-empleado">Raise</th>
            </tr>

            <tr>
              <th className="evaluationTitleCore">Behaviors Evaluation</th>
              <th className="categoriesCore">Categories</th>
              <th className="rotated-title-pais"> Raise </th>
            </tr>
          </thead>

          <tbody>
            {behave1.map((behave, index) => (
              <tr>
                <td className="inform-all">{behave}</td>
                <td className="categores2">{category1[index]}</td>
                <td className="num-evaluacion">2</td>
              </tr>
            ))}

            {behave2.map((behave, index) => (
              <tr>
                <td className="inform12">{behave}</td>
                <td className="categores2">{category2[index]}</td>
              </tr>
            ))}

            {behave3.map((behave, index) => (
              <tr>
                <td className="inform3">{behave}</td>
                <td className="categores2">{category3[index]}</td>
              </tr>
            ))}

            {behave4.map((behave, index) => (
              <tr>
                <td className="inform4">{behave}</td>
                <td className="categores2">{category4[index]}</td>
              </tr>
            ))}

            {behave5.map((behave, index) => (
              <tr>
                <td className="inform5">{behave}</td>
                <td className="categores2">{category5[index]}</td>
              </tr>
            ))}

            {behave6.map((behave, index) => (
              <tr>
                <td className="inform6">{behave}</td>
                <td className="categores2">{category6[index]}</td>
              </tr>
            ))}

            {behave7.map((behave, index) => (
              <tr>
                <td className="inform7">{behave}</td>
                <td className="categores2">{category7[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="botns">
          <Link to="/administrar-preguntas">Regresar</Link>
        </button>
      </div>
    </div>
  );
};

export default CoreCompetences;
