const resumeService = require('../services/resumeService');
const fs = require('fs');

const generateResume = async (req, res) => {
  try {
    console.log('Received resume generation request:', req.body);
    const resumeData = req.body;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'profile', 'education', 'workExperience', 'skills', 'hobbies'];
    const missingFields = requiredFields.filter(field => !resumeData[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    console.log('Generating resume PDF...');
    // Generate the resume PDF
    const { filePath, fileName } = await resumeService.generateResume(resumeData);
    console.log('PDF generated successfully:', { filePath, fileName });

    // Verify file exists
    if (!fs.existsSync(filePath)) {
      console.error('Generated file does not exist:', filePath);
      return res.status(500).json({
        success: false,
        message: 'Error: Generated file not found'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    
    // Handle stream errors
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error streaming the resume file'
        });
      }
    });

    // Handle response finish
    res.on('finish', () => {
      console.log('File sent successfully, cleaning up...');
      // Clean up file after sending
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        } else {
          console.log('Temporary file deleted successfully');
        }
      });
    });

    // Pipe the file to the response
    fileStream.pipe(res);

  } catch (error) {
    console.error('Error generating resume:', error);
    console.error('Error stack:', error.stack);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: `Error generating resume: ${error.message}`
      });
    }
  }
};

module.exports = {
  generateResume
}; 