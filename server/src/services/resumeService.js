const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class ResumeService {
  constructor() {
    this.outputDir = path.join(__dirname, '../../output');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  generateResume(resumeData) {
    return new Promise((resolve, reject) => {
      try {
        console.log('Starting PDF generation...');
        const doc = new PDFDocument({ margin: 50 });
        const fileName = `resume_${Date.now()}.pdf`;
        const filePath = path.join(this.outputDir, fileName);
        
        console.log('Creating PDF file at:', filePath);
        // Pipe the PDF to a file
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add content to the PDF
        try {
          this.addHeader(doc, resumeData.fullName);
          this.addContactInfo(doc, resumeData);
          this.addProfile(doc, resumeData.profile);
          this.addEducation(doc, resumeData.education);
          this.addWorkExperience(doc, resumeData.workExperience);
          this.addSkills(doc, resumeData.skills);
          this.addHobbies(doc, resumeData.hobbies);
        } catch (contentError) {
          console.error('Error adding content to PDF:', contentError);
          reject(new Error(`Error adding content to PDF: ${contentError.message}`));
          return;
        }

        // Finalize the PDF
        doc.end();

        stream.on('finish', () => {
          console.log('PDF file written successfully');
          resolve({
            filePath,
            fileName
          });
        });

        stream.on('error', (error) => {
          console.error('Error writing PDF file:', error);
          reject(new Error(`Error writing PDF file: ${error.message}`));
        });
      } catch (error) {
        console.error('Error in generateResume:', error);
        reject(new Error(`Error generating resume: ${error.message}`));
      }
    });
  }

  addHeader(doc, name) {
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .text(name, { align: 'center' })
      .moveDown(2);
  }

  addContactInfo(doc, data) {
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Email: ${data.email}`)
      .text(`Phone: ${data.phone}`)
      .text(`Address: ${data.address}`)
      .text(`Postal Code: ${data.postalCode}`)
      .moveDown(2);
  }

  addProfile(doc, profile) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Profile')
      .moveDown(0.5)
      .fontSize(12)
      .font('Helvetica')
      .text(profile)
      .moveDown(2);
  }

  addEducation(doc, education) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Education')
      .moveDown(0.5);

    education.forEach(edu => {
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(edu.institution)
        .font('Helvetica')
        .text(`Degree: ${edu.degree}`)
        .text(`Graduation Date: ${edu.graduationDate}`)
        .moveDown(1);
    });
  }

  addWorkExperience(doc, experience) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Work Experience')
      .moveDown(0.5);

    experience.forEach(exp => {
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(exp.companyName)
        .font('Helvetica')
        .text(`Position: ${exp.jobTitle}`)
        .text(`Date: ${exp.date}`)
        .text('Description:')
        .text(exp.experience)
        .moveDown(1);
    });
  }

  addSkills(doc, skills) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Skills')
      .moveDown(0.5)
      .fontSize(12)
      .font('Helvetica')
      .text(skills.join(', '))
      .moveDown(2);
  }

  addHobbies(doc, hobbies) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('Hobbies')
      .moveDown(0.5)
      .fontSize(12)
      .font('Helvetica')
      .text(hobbies.join(', '))
      .moveDown(2);
  }
}

module.exports = new ResumeService(); 