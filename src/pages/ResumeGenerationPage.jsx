import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  position: absolute;
  background: #F2FFF2;
  height: 89px;
  width: 100%;
  top: 0;
  left: 0;
`;

const Logo = styled.div`
  position: absolute;
  left: 40px;
  top: 29px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LogoText = styled.span`
  font-family: ${props => props.font || 'Martel'};
  font-size: ${props => props.size || '24px'};
  font-weight: ${props => props.weight || '900'};
  color: #000000;
`;

const Navigation = styled.div`
  position: absolute;
  height: 50px;
  width: 359.72px;
  left: 50%;
  transform: translateX(-50%);
  top: 27px;
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: Inter;
  font-size: 20px;
  font-weight: ${props => props.active ? '700' : '500'};
  color: #282828;
`;

const BrowseJobsButton = styled.div`
  position: absolute;
  right: 40px;
  top: 27px;
  padding: 10px;
  cursor: pointer;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  color: #0C463B;
`;

const FormSection = styled.div`
  margin-top: 120px;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const FormTitle = styled.h1`
  font-family: Poppins;
  font-size: 45px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 10px;
`;

const FormSubtitle = styled.p`
  font-family: Poppins;
  font-size: 22px;
  color: #5E6670;
  margin-bottom: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  font-family: Poppins;
  font-size: 24px;
  font-weight: 500;
  color: #303030;
  margin-bottom: 10px;
`;

const Required = styled.span`
  color: #F04141;
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  max-width: 400px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 2px solid #E7E7F1;
  border-radius: 8px;
  padding: 0 20px;
  font-family: Poppins;
  font-size: 16px;
  color: #121224;
  margin-bottom: 10px;
  
  &::placeholder {
    color: rgba(18, 18, 36, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 2px solid #E7E7F1;
  border-radius: 8px;
  padding: 20px;
  font-family: Poppins;
  font-size: 16px;
  color: #121224;
  resize: vertical;
  margin-bottom: 10px;
  
  &::placeholder {
    color: rgba(18, 18, 36, 0.5);
  }
`;

const FormImage = styled.img`
  position: absolute;
  right: 100px;
  top: 40px;
  width: 400px;
  height: auto;
  filter: drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.15));
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
`;

const Button = styled.button`
  height: 45px;
  width: 200px;
  border-radius: 8px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &.primary {
    background: #0C463B;
    color: #FFFFFF;
  }
  
  &.secondary {
    background: #E9191D;
    color: #FFFFFF;
  }
`;

const SkillHobbyContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
`;

const SkillHobbySection = styled.div`
  flex: 1;
`;

const InputWithButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  height: 45px;
  width: 45px;
  border-radius: 8px;
  background: #E9191D;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const FormContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 1.00);
  border-radius: 40px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  padding: 40px;
  margin-top: 20px;
  margin-bottom: 40px;
  min-height: 500px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0C463B;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f44336;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease-out;
  max-width: 400px;
  z-index: 1000;

  ul {
    margin: 5px 0 0 0;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const TemplateSelection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TemplateCard = styled.div`
  width: 200px;
  height: 280px;
  border: 2px solid ${props => props.selected ? '#0C463B' : '#E7E7F1'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#F2FFF2' : '#FFFFFF'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TemplatePreview = styled.div`
  width: 100%;
  height: 200px;
  background: #F5F5F5;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  color: #666;
`;

const TemplateName = styled.div`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  color: #303030;
  text-align: center;
`;

const PreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PreviewContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const PreviewHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E7E7F1;
`;

const PreviewSection = styled.div`
  margin-bottom: 20px;
`;

const PreviewSectionTitle = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  color: #0C463B;
  margin-bottom: 10px;
`;

const PreviewText = styled.p`
  font-family: Poppins;
  font-size: 14px;
  color: #303030;
  margin: 5px 0;
`;

const PreviewSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillTag = styled.span`
  background: #F2FFF2;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #0C463B;
`;

const ResumeGenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    postalCode: '',
    profile: '',
    template: 'modern',
    education: [{
      institution: '',
      degree: '',
      graduationDate: ''
    }],
    workExperience: [{
      companyName: '',
      jobTitle: '',
      date: '',
      experience: ''
    }],
    skills: [''],
    hobbies: ['']
  });

  // Initialize form data with location state if available
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        companyName: '',
        jobTitle: '',
        date: '',
        experience: ''
      }]
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        graduationDate: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    // Required fields validation
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.profile.trim()) errors.push('Profile description is required');
    
    // Education validation
    if (formData.education.length === 0 || formData.education.every(edu => !edu.institution.trim() && !edu.degree.trim() && !edu.graduationDate)) {
      errors.push('At least one education entry is required');
    } else {
      formData.education.forEach((edu, index) => {
        if (!edu.institution.trim()) errors.push(`Institution name is required for education #${index + 1}`);
        if (!edu.degree.trim()) errors.push(`Degree is required for education #${index + 1}`);
        if (!edu.graduationDate) errors.push(`Graduation date is required for education #${index + 1}`);
      });
    }

    // Work Experience validation
    if (formData.workExperience.length === 0 || formData.workExperience.every(exp => !exp.companyName.trim() && !exp.jobTitle.trim() && !exp.date && !exp.experience.trim())) {
      errors.push('At least one work experience entry is required');
    } else {
      formData.workExperience.forEach((exp, index) => {
        if (!exp.companyName.trim()) errors.push(`Company name is required for experience #${index + 1}`);
        if (!exp.jobTitle.trim()) errors.push(`Job title is required for experience #${index + 1}`);
        if (!exp.date) errors.push(`Date is required for experience #${index + 1}`);
        if (!exp.experience.trim()) errors.push(`Experience description is required for experience #${index + 1}`);
      });
    }

    // Skills validation
    if (formData.skills.length === 0 || formData.skills.every(skill => !skill.trim())) {
      errors.push('At least one skill is required');
    }

    // Hobbies validation
    if (formData.hobbies.length === 0 || formData.hobbies.every(hobby => !hobby.trim())) {
      errors.push('At least one hobby is required');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setShowSuccess(false);
    setIsLoading(true);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Show success message before making the request
      setShowSuccess(true);

      const response = await fetch('http://localhost:5000/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      // Get the blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Clear success message after delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      setShowSuccess(false);
      console.error('Error:', error);
      setError(['Failed to generate resume. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewData(formData);
    setShowPreview(true);
  };

  return (
    <PageContainer>
      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      
      {showSuccess && (
        <SuccessMessage>
          Resume generated successfully! Downloading...
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage>
          <strong>Please fix the following errors:</strong>
          <ul>
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </ErrorMessage>
      )}

      {showPreview && (
        <PreviewModal onClick={() => setShowPreview(false)}>
          <PreviewContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPreview(false)}>×</CloseButton>
            <PreviewHeader>
              <h2>{previewData.fullName}</h2>
              <PreviewText>{previewData.email} | {previewData.phone}</PreviewText>
              <PreviewText>{previewData.address}, {previewData.postalCode}</PreviewText>
            </PreviewHeader>

            <PreviewSection>
              <PreviewSectionTitle>Profile</PreviewSectionTitle>
              <PreviewText>{previewData.profile}</PreviewText>
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Education</PreviewSectionTitle>
              {previewData.education.map((edu, index) => (
                <div key={index}>
                  <PreviewText><strong>{edu.institution}</strong></PreviewText>
                  <PreviewText>{edu.degree} - {edu.graduationDate}</PreviewText>
                </div>
              ))}
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Work Experience</PreviewSectionTitle>
              {previewData.workExperience.map((exp, index) => (
                <div key={index}>
                  <PreviewText><strong>{exp.companyName}</strong> - {exp.jobTitle}</PreviewText>
                  <PreviewText>{exp.date}</PreviewText>
                  <PreviewText>{exp.experience}</PreviewText>
                </div>
              ))}
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Skills</PreviewSectionTitle>
              <PreviewSkills>
                {previewData.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </PreviewSkills>
            </PreviewSection>

            <PreviewSection>
              <PreviewSectionTitle>Hobbies</PreviewSectionTitle>
              <PreviewSkills>
                {previewData.hobbies.map((hobby, index) => (
                  <SkillTag key={index}>{hobby}</SkillTag>
                ))}
              </PreviewSkills>
            </PreviewSection>
          </PreviewContent>
        </PreviewModal>
      )}

      <Header>
        <Logo>
          <LogoText>Job</LogoText>
          <LogoText font="Matura MT Script Capitals" size="32px" weight="400">Fiesta</LogoText>
        </Logo>
        
        <Navigation>
          <NavItem active>Home</NavItem>
          <NavItem>Jobs</NavItem>
          <NavItem>Categories</NavItem>
        </Navigation>
        
        <BrowseJobsButton>Browse jobs</BrowseJobsButton>
      </Header>

      <FormSection>
        <FormTitle>Resume Generation</FormTitle>
        <FormSubtitle>Your Gateway to a Perfecto Resume</FormSubtitle>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <InputColumn>
              <FormGroup>
                <Label>Full name<Required>*</Required></Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email ID<Required>*</Required></Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email id"
                  required
                />
              </FormGroup>
            </InputColumn>
            <FormImage src="/assets/images/group_27.svg" alt="Resume Generation" />

            <FormGroup>
              <Label>Personal Details<Required>*</Required></Label>
              <InputRow>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  style={{ flex: 1 }}
                />
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="Enter Date of Birth"
                  style={{ flex: 1 }}
                />
              </InputRow>
              <InputRow>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  style={{ flex: 2 }}
                />
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter Postal Code"
                  style={{ flex: 1 }}
                />
              </InputRow>
            </FormGroup>

            <FormGroup>
              <Label>Profile<Required>*</Required></Label>
              <InputRow>
                <TextArea
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  placeholder="Write a brief description about yourself"
                  style={{ height: '120px', width: '100%' }}
                />
              </InputRow>
            </FormGroup>

            <FormGroup>
              <Label>Education<Required>*</Required></Label>
              {formData.education.map((edu, index) => (
                <div key={index}>
                  <InputRow>
                    <Input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      placeholder="Institution Name"
                      style={{ flex: 1 }}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeEducation(index)}>
                        ×
                      </RemoveButton>
                    )}
                  </InputRow>
                  <InputRow>
                    <Input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      placeholder="Degree Earned"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                      placeholder="Graduation Date"
                      style={{ flex: 1 }}
                    />
                  </InputRow>
                </div>
              ))}
              <Button type="button" onClick={addEducation}>Education +</Button>
            </FormGroup>

            <FormGroup>
              <Label>Work Experience<Required>*</Required></Label>
              {formData.workExperience.map((exp, index) => (
                <div key={index}>
                  <InputRow>
                    <Input
                      type="text"
                      value={exp.companyName}
                      onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                      placeholder="Company Name"
                      style={{ flex: 1 }}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeWorkExperience(index)}>
                        ×
                      </RemoveButton>
                    )}
                  </InputRow>
                  <InputRow>
                    <Input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)}
                      placeholder="Job Title"
                      style={{ flex: 1 }}
                    />
                    <Input
                      type="date"
                      value={exp.date}
                      onChange={(e) => handleWorkExperienceChange(index, 'date', e.target.value)}
                      placeholder="Date"
                      style={{ flex: 1 }}
                    />
                  </InputRow>
                  <InputRow>
                    <TextArea
                      value={exp.experience}
                      onChange={(e) => handleWorkExperienceChange(index, 'experience', e.target.value)}
                      placeholder="Describe your work experience"
                      style={{ width: '100%' }}
                    />
                  </InputRow>
                </div>
              ))}
              <Button type="button" onClick={addWorkExperience}>Experience +</Button>
            </FormGroup>

            <SkillHobbyContainer>
              <SkillHobbySection>
                <Label>Skills<Required>*</Required></Label>
                {formData.skills.map((skill, index) => (
                  <InputWithButton key={index}>
                    <Input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'skills')}
                      placeholder={`Enter Skill ${index + 1}`}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeArrayItem(index, 'skills')}>
                        ×
                      </RemoveButton>
                    )}
                  </InputWithButton>
                ))}
                <Button type="button" onClick={() => addArrayItem('skills')}>Skill +</Button>
              </SkillHobbySection>

              <SkillHobbySection>
                <Label>Hobbies<Required>*</Required></Label>
                {formData.hobbies.map((hobby, index) => (
                  <InputWithButton key={index}>
                    <Input
                      type="text"
                      value={hobby}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'hobbies')}
                      placeholder={`Enter Hobby ${index + 1}`}
                    />
                    {index > 0 && (
                      <RemoveButton onClick={() => removeArrayItem(index, 'hobbies')}>
                        ×
                      </RemoveButton>
                    )}
                  </InputWithButton>
                ))}
                <Button type="button" onClick={() => addArrayItem('hobbies')}>Hobby +</Button>
              </SkillHobbySection>
            </SkillHobbyContainer>

            <FormGroup>
              <Label>Choose Template<Required>*</Required></Label>
              <TemplateSelection>
                <TemplateCard 
                  selected={formData.template === 'modern'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'modern' }))}
                >
                  <TemplatePreview>Modern Template</TemplatePreview>
                  <TemplateName>Modern</TemplateName>
                </TemplateCard>
                <TemplateCard 
                  selected={formData.template === 'professional'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'professional' }))}
                >
                  <TemplatePreview>Professional Template</TemplatePreview>
                  <TemplateName>Professional</TemplateName>
                </TemplateCard>
                <TemplateCard 
                  selected={formData.template === 'creative'} 
                  onClick={() => setFormData(prev => ({ ...prev, template: 'creative' }))}
                >
                  <TemplatePreview>Creative Template</TemplatePreview>
                  <TemplateName>Creative</TemplateName>
                </TemplateCard>
              </TemplateSelection>
            </FormGroup>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="button" className="primary" onClick={() => navigate("/template-selection", { state: { formData } })}>
                Next
              </Button>
            </ButtonGroup>
          </form>
        </FormContainer>
      </FormSection>
    </PageContainer>
  );
};

export default ResumeGenerationPage; 