import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

// Reuse the same styled components for header
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

// New styled components for template selection
const ContentSection = styled.div`
  margin-top: 120px;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const PageTitle = styled.h1`
  font-family: Poppins;
  font-size: 45px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 10px;
`;

const PageSubtitle = styled.p`
  font-family: Poppins;
  font-size: 22px;
  color: #5E6670;
  margin-bottom: 40px;
`;

const CategorySelector = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active ? '#0C463B' : '#5E6670'};
  background: ${props => props.active ? '#F2FFF2' : '#FFFFFF'};
  border: 2px solid ${props => props.active ? '#0C463B' : '#E7E7F1'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #F2FFF2;
    color: #0C463B;
  }
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const TemplateCard = styled.div`
  border: 2px solid ${props => props.selected ? '#0C463B' : '#E7E7F1'};
  border-radius: 8px;
  overflow: hidden;
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
  height: 400px;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  color: #666;
`;

const TemplateInfo = styled.div`
  padding: 15px;
  border-top: 1px solid #E7E7F1;
`;

const TemplateName = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 5px;
`;

const TemplateDescription = styled.p`
  font-family: Poppins;
  font-size: 14px;
  color: #5E6670;
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

  &.preview {
    background: #4CAF50;
    color: #FFFFFF;
  }
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
  margin-bottom: 20px;
`;

const PreviewName = styled.h2`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 600;
  color: #303030;
`;

const PreviewContact = styled.p`
  font-family: Poppins;
  font-size: 18px;
  color: #5E6670;
`;

const PreviewSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 5px;
`;

const SectionContent = styled.p`
  font-family: Poppins;
  font-size: 14px;
  color: #5E6670;
`;

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('modern');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Template data
  const templates = {
    modern: [
      {
        id: 'modern-1',
        name: 'Modern Minimal',
        description: 'Clean and minimalist design with focus on content',
        preview: 'Modern Template 1'
      },
      {
        id: 'modern-2',
        name: 'Modern Professional',
        description: 'Professional layout with modern typography',
        preview: 'Modern Template 2'
      },
      {
        id: 'modern-3',
        name: 'Modern Creative',
        description: 'Creative design with modern elements',
        preview: 'Modern Template 3'
      }
    ],
    professional: [
      {
        id: 'professional-1',
        name: 'Classic Professional',
        description: 'Traditional professional layout',
        preview: 'Professional Template 1'
      },
      {
        id: 'professional-2',
        name: 'Executive Professional',
        description: 'Executive style with professional touch',
        preview: 'Professional Template 2'
      },
      {
        id: 'professional-3',
        name: 'Corporate Professional',
        description: 'Corporate style professional template',
        preview: 'Professional Template 3'
      }
    ],
    creative: [
      {
        id: 'creative-1',
        name: 'Creative Portfolio',
        description: 'Creative design for portfolio style resume',
        preview: 'Creative Template 1'
      },
      {
        id: 'creative-2',
        name: 'Artistic Creative',
        description: 'Artistic layout with creative elements',
        preview: 'Creative Template 2'
      },
      {
        id: 'creative-3',
        name: 'Innovative Creative',
        description: 'Innovative design with creative flair',
        preview: 'Creative Template 3'
      }
    ]
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerate = () => {
    if (selectedTemplate) {
      navigate('/resume-preview', {
        state: {
          formData: location.state?.formData,
          template: selectedTemplate
        }
      });
    }
  };

  const handlePreview = () => {
    if (selectedTemplate) {
      setShowPreview(true);
    }
  };

  const handleBack = () => {
    navigate('/resume-generation', { 
      state: { formData: location.state?.formData } 
    });
  };

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
        <PageTitle>Choose Your Template</PageTitle>
        <PageSubtitle>Select a template that best represents your professional style</PageSubtitle>

        <CategorySelector>
          <CategoryButton 
            active={selectedCategory === 'modern'} 
            onClick={() => setSelectedCategory('modern')}
          >
            Modern
          </CategoryButton>
          <CategoryButton 
            active={selectedCategory === 'professional'} 
            onClick={() => setSelectedCategory('professional')}
          >
            Professional
          </CategoryButton>
          <CategoryButton 
            active={selectedCategory === 'creative'} 
            onClick={() => setSelectedCategory('creative')}
          >
            Creative
          </CategoryButton>
        </CategorySelector>

        <TemplateGrid>
          {templates[selectedCategory].map((template) => (
            <TemplateCard 
              key={template.id}
              selected={selectedTemplate === template.id}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <TemplatePreview>{template.preview}</TemplatePreview>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
              </TemplateInfo>
            </TemplateCard>
          ))}
        </TemplateGrid>

        <ButtonGroup>
          <Button 
            type="button" 
            className="secondary" 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            type="button" 
            className="preview" 
            onClick={handlePreview}
            disabled={!selectedTemplate}
          >
            Preview
          </Button>
          <Button 
            type="button" 
            className="primary" 
            onClick={handleGenerate}
            disabled={!selectedTemplate}
          >
            Generate Resume
          </Button>
        </ButtonGroup>
      </ContentSection>

      {showPreview && (
        <PreviewModal onClick={() => setShowPreview(false)}>
          <PreviewContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPreview(false)}>×</CloseButton>
            <PreviewHeader>
              <PreviewName>{location.state?.formData.fullName}</PreviewName>
              <PreviewContact>{location.state?.formData.email} | {location.state?.formData.phone}</PreviewContact>
              <PreviewContact>{location.state?.formData.address}, {location.state?.formData.postalCode}</PreviewContact>
            </PreviewHeader>

            <PreviewSection>
              <SectionTitle>Profile</SectionTitle>
              <SectionContent>{location.state?.formData.profile}</SectionContent>
            </PreviewSection>

            <PreviewSection>
              <SectionTitle>Education</SectionTitle>
              {location.state?.formData.education.map((edu, index) => (
                <SectionContent key={index}>
                  <strong>{edu.institution}</strong>
                  <p>{edu.degree} - {edu.graduationDate}</p>
                </SectionContent>
              ))}
            </PreviewSection>

            <PreviewSection>
              <SectionTitle>Work Experience</SectionTitle>
              {location.state?.formData.workExperience.map((exp, index) => (
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
                {location.state?.formData.skills.join(', ')}
              </SectionContent>
            </PreviewSection>

            <PreviewSection>
              <SectionTitle>Hobbies</SectionTitle>
              <SectionContent>
                {location.state?.formData.hobbies.join(', ')}
              </SectionContent>
            </PreviewSection>
          </PreviewContent>
        </PreviewModal>
      )}
    </PageContainer>
  );
};

export default TemplateSelectionPage; 