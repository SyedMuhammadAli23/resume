import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

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

const ContentSection = styled.div`
  margin-top: 120px;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const PreviewContainer = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-top: 20px;
`;

const PreviewHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const PreviewName = styled.h1`
  font-family: Poppins;
  font-size: 32px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 10px;
`;

const PreviewContact = styled.div`
  font-family: Poppins;
  font-size: 16px;
  color: #5E6670;
  margin-bottom: 5px;
`;

const PreviewSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 600;
  color: #0C463B;
  margin-bottom: 15px;
  border-bottom: 2px solid #F2FFF2;
  padding-bottom: 5px;
`;

const SectionContent = styled.div`
  font-family: Poppins;
  font-size: 16px;
  color: #303030;
  line-height: 1.6;
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

const ResumePreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, template } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  // If no data is passed, redirect back to resume generation
  React.useEffect(() => {
    if (!formData || !template) {
      console.log('Missing data:', { formData, template });
      navigate('/resume-generation');
    }
  }, [formData, template, navigate]);

  const handleDownload = async () => {
    if (!formData || !template) {
      setError('Missing resume data. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuccess(false);

    try {
      // First check if server is running
      try {
        const serverCheck = await fetch('http://localhost:5000/health');
        if (!serverCheck.ok) {
          throw new Error('Server is not responding properly');
        }
      } catch (serverError) {
        if (serverError.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to the server. Please make sure the server is running on port 5000 and no browser extensions are blocking the request.');
        }
        throw serverError;
      }

      console.log('Sending data to server:', { formData, template });
      const response = await fetch('http://localhost:5000/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
        body: JSON.stringify({
          ...formData,
          template
        }),
      }).catch(error => {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Request was blocked. Please try disabling any ad blockers or security extensions and try again.');
        }
        throw error;
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error(`Server error: ${errorData}`);
      }

      // Get the blob
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Received empty PDF file from server');
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.fullName.replace(/\s+/g, '_')}_resume.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Show success message
      setShowSuccess(true);
      setError(null);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error details:', error);
      let errorMessage = 'Failed to generate resume. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        errorMessage += 'Request was blocked. Please try the following:\n' +
          '1. Disable any ad blockers or security extensions\n' +
          '2. Make sure the server is running on port 5000\n' +
          '3. Try using a different browser';
      } else if (error.message.includes('Server is not responding')) {
        errorMessage += 'Server is not responding properly. Please try again later.';
      } else {
        errorMessage += error.message;
      }
      
      setError(errorMessage);
      setShowSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData || !template) {
    return (
      <PageContainer>
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
        <ContentSection>
          <ErrorMessage>
            Missing resume data. Please go back and try again.
          </ErrorMessage>
          <ButtonGroup>
            <Button 
              type="button" 
              className="secondary" 
              onClick={() => navigate("/resume-generation")}
            >
              Back to Resume Generation
            </Button>
          </ButtonGroup>
        </ContentSection>
      </PageContainer>
    );
  }

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
          {error}
        </ErrorMessage>
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

      <ContentSection>
        <PreviewContainer>
          <PreviewHeader>
            <PreviewName>{formData.fullName}</PreviewName>
            <PreviewContact>{formData.email} | {formData.phone}</PreviewContact>
            <PreviewContact>{formData.address}, {formData.postalCode}</PreviewContact>
          </PreviewHeader>

          <PreviewSection>
            <SectionTitle>Profile</SectionTitle>
            <SectionContent>{formData.profile}</SectionContent>
          </PreviewSection>

          <PreviewSection>
            <SectionTitle>Education</SectionTitle>
            {formData.education.map((edu, index) => (
              <SectionContent key={index}>
                <strong>{edu.institution}</strong>
                <p>{edu.degree} - {edu.graduationDate}</p>
              </SectionContent>
            ))}
          </PreviewSection>

          <PreviewSection>
            <SectionTitle>Work Experience</SectionTitle>
            {formData.workExperience.map((exp, index) => (
              <SectionContent key={index}>
                <strong>{exp.companyName}</strong> - {exp.jobTitle}
                <p>{exp.date}</p>
                <p>{exp.experience}</p>
              </SectionContent>
            ))}
          </PreviewSection>

          <PreviewSection>
            <SectionTitle>Skills</SectionTitle>
            <SectionContent>
              {formData.skills.join(', ')}
            </SectionContent>
          </PreviewSection>

          <PreviewSection>
            <SectionTitle>Hobbies</SectionTitle>
            <SectionContent>
              {formData.hobbies.join(', ')}
            </SectionContent>
          </PreviewSection>
        </PreviewContainer>

        <ButtonGroup>
          <Button 
            type="button" 
            className="secondary" 
            onClick={() => navigate("/template-selection", { state: { formData } })}
          >
            Back
          </Button>
          <Button 
            type="button" 
            className="primary" 
            onClick={handleDownload}
            disabled={isLoading}
          >
            Download Resume
          </Button>
        </ButtonGroup>
      </ContentSection>
    </PageContainer>
  );
};

export default ResumePreviewPage; 