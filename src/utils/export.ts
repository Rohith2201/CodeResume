import { Resume } from '../types/resume';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip, BorderStyle, TableRow, TableCell, Table, WidthType } from 'docx';

export async function exportToPdf(resume: Resume) {
  // A4 size: 210mm × 297mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
    putOnlyUsedFonts: true
  });

  // Set fonts and colors
  doc.setFont('helvetica');
  const colors = {
    primary: '#1F2937', // gray-800
    secondary: '#4B5563', // gray-600
    accent: '#2563EB', // blue-600
    light: '#9CA3AF', // gray-400
    border: '#E5E7EB' // gray-200
  };

  // A4 dimensions
  const pageWidth = 210; // mm
  const pageHeight = 297; // mm
  const margin = {
    top: 20,
    bottom: 20,
    left: 25,
    right: 25
  };
  const contentWidth = pageWidth - margin.left - margin.right;
  let yPos = margin.top;

  // Header Section
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary);
  doc.text(resume.personalInfo.fullName, margin.left, yPos);
  yPos += 12;

  // Contact Info Row
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.secondary);
  let xPos = margin.left;
  const contactSpacing = 40; // mm

  // Helper function for contact items
  const addContactItem = (icon: string, text: string) => {
    const iconWidth = doc.getTextWidth(icon);
    doc.text(icon, xPos, yPos);
    doc.text(text, xPos + iconWidth + 2, yPos);
    xPos += contactSpacing;
  };

  if (resume.personalInfo.email) {
    addContactItem('✉', resume.personalInfo.email);
  }
  if (resume.personalInfo.phone) {
    addContactItem('📱', resume.personalInfo.phone);
  }
  if (resume.personalInfo.location) {
    addContactItem('📍', resume.personalInfo.location);
  }

  yPos += 8;
  xPos = margin.left;

  // Social Links Row
  if (resume.personalInfo.linkedin || resume.personalInfo.github || resume.personalInfo.website) {
    doc.setTextColor(colors.accent);
    if (resume.personalInfo.linkedin) {
      addContactItem('', resume.personalInfo.linkedin);
    }
    if (resume.personalInfo.github) {
      addContactItem('', resume.personalInfo.github);
    }
    if (resume.personalInfo.website) {
      addContactItem('🌐', resume.personalInfo.website);
    }
    yPos += 8;
  }

  // Professional Summary
  if (resume.personalInfo.summary) {
    yPos += 6;
    doc.setFontSize(11);
    doc.setTextColor(colors.secondary);
    const summaryLines = doc.splitTextToSize(resume.personalInfo.summary, contentWidth);
    doc.text(summaryLines, margin.left, yPos);
    yPos += (summaryLines.length * 5) + 10;
  }

  // Section Helper
  const addSection = (title: string) => {
    doc.setFillColor(colors.primary);
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(0.5);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.primary);
    doc.text(title.toUpperCase(), margin.left, yPos);
    
    yPos += 2;
    doc.line(margin.left, yPos, pageWidth - margin.right, yPos);
    yPos += 6;
  };

  // Experience Section
  if (resume.experience.length > 0) {
    addSection('Professional Experience');
    
    resume.experience.forEach((exp, index) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = margin.top;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(exp.position, margin.left, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(colors.secondary);
      const dateText = `${exp.startDate} - ${exp.endDate || 'Present'}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, pageWidth - margin.right - dateWidth, yPos);

      yPos += 5;
      doc.text(`${exp.company} • ${exp.location}`, margin.left, yPos);
      yPos += 5;

      const descLines = doc.splitTextToSize(exp.description, contentWidth);
      doc.text(descLines, margin.left, yPos);
      yPos += (descLines.length * 5) + 8;

      if (index < resume.experience.length - 1) {
        yPos += 4;
      }
    });
    
    yPos += 8;
  }

  // Education Section
  if (resume.education.length > 0) {
    addSection('Education');
    
    resume.education.forEach((edu, index) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = margin.top;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(edu.degree, margin.left, yPos);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const dateText = `${edu.startDate} - ${edu.endDate || 'Present'}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, pageWidth - margin.right - dateWidth, yPos);

      yPos += 5;
      doc.setTextColor(colors.secondary);
      doc.text(`${edu.school} • ${edu.fieldOfStudy}`, margin.left, yPos);
      
      if (edu.gpa) {
        yPos += 5;
        doc.text(`GPA: ${edu.gpa}`, margin.left, yPos);
      }

      yPos += 8;
    });
    
    yPos += 8;
  }

  // Skills Section
  if (resume.skills.length > 0) {
    addSection('Skills');
    
    const skillsByLevel = resume.skills.reduce((acc, skill) => {
      if (!acc[skill.level]) acc[skill.level] = [];
      acc[skill.level].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(skillsByLevel).forEach(([level, skills]) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = margin.top;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(colors.primary);
      doc.text(level, margin.left, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.secondary);
      const skillText = skills.join(' • ');
      const skillLines = doc.splitTextToSize(skillText, contentWidth);
      doc.text(skillLines, margin.left, yPos);
      yPos += (skillLines.length * 5) + 6;
    });
  }

  // Projects Section
  if (resume.projects.length > 0) {
    addSection('Projects');
    
    resume.projects.forEach((project, index) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = margin.top;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(project.title, margin.left, yPos);

      if (project.url) {
        const urlText = '↗';
        const titleWidth = doc.getTextWidth(project.title);
        doc.setTextColor(colors.accent);
        doc.text(urlText, margin.left + titleWidth + 2, yPos);
      }

      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(colors.secondary);
      const dateText = `${project.startDate} - ${project.endDate}`;
      doc.text(dateText, margin.left, yPos);
      yPos += 5;

      const descLines = doc.splitTextToSize(project.description, contentWidth);
      doc.text(descLines, margin.left, yPos);
      yPos += (descLines.length * 5);

      if (project.technologies.length > 0) {
        yPos += 5;
        doc.setTextColor(colors.accent);
        const techText = project.technologies.join(' • ');
        const techLines = doc.splitTextToSize(techText, contentWidth);
        doc.text(techLines, margin.left, yPos);
        yPos += (techLines.length * 5);
      }

      yPos += 8;
    });
  }

  // Save the PDF
  const fileName = `${resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
  doc.save(fileName);
}

export async function exportToWord(resume: Resume) {
  const sections: any[] = [];

  // Header Section
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.personalInfo.fullName,
          bold: true,
          size: 36,
          color: '1F2937'
        })
      ],
      spacing: {
        after: 200
      }
    })
  );

  // Contact Information
  const contactInfo = [];
  if (resume.personalInfo.email) {
    contactInfo.push(new TextRun({ text: '✉ ' + resume.personalInfo.email }));
    contactInfo.push(new TextRun({ text: ' | ' }));
  }
  if (resume.personalInfo.phone) {
    contactInfo.push(new TextRun({ text: '📱 ' + resume.personalInfo.phone }));
    contactInfo.push(new TextRun({ text: ' | ' }));
  }
  if (resume.personalInfo.location) {
    contactInfo.push(new TextRun({ text: '📍 ' + resume.personalInfo.location }));
  }

  sections.push(
    new Paragraph({
      children: contactInfo,
      spacing: {
        after: 200
      }
    })
  );

  // Social Links
  const socialLinks = [];
  if (resume.personalInfo.linkedin) {
    socialLinks.push(new TextRun({ text: resume.personalInfo.linkedin }));
    socialLinks.push(new TextRun({ text: ' | ' }));
  }
  if (resume.personalInfo.github) {
    socialLinks.push(new TextRun({ text: resume.personalInfo.github }));
    socialLinks.push(new TextRun({ text: ' | ' }));
  }
  if (resume.personalInfo.website) {
    socialLinks.push(new TextRun({ text: resume.personalInfo.website }));
  }

  if (socialLinks.length > 0) {
    sections.push(
      new Paragraph({
        children: socialLinks,
        spacing: {
          after: 200
        }
      })
    );
  }

  // Summary
  if (resume.personalInfo.summary) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resume.personalInfo.summary,
            size: 24
          })
        ],
        spacing: {
          after: 400
        }
      })
    );
  }

  // Helper function for section headers
  const addSectionHeader = (text: string) => {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: text.toUpperCase(),
            bold: true,
            size: 28,
            color: '1F2937'
          })
        ],
        spacing: {
          before: 400,
          after: 200
        },
        border: {
          bottom: {
            color: '1F2937',
            size: 1,
            style: BorderStyle.SINGLE
          }
        }
      })
    );
  };

  // Experience Section
  if (resume.experience.length > 0) {
    addSectionHeader('Professional Experience');

    resume.experience.forEach((exp) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 26
            }),
            new TextRun({
              text: `\t${exp.startDate} - ${exp.endDate || 'Present'}`,
              size: 24
            })
          ],
          spacing: {
            before: 200
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.company} • ${exp.location}`,
              size: 24,
              color: '4B5563'
            })
          ],
          spacing: {
            before: 100
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: exp.description,
              size: 24
            })
          ],
          spacing: {
            before: 100,
            after: 200
          }
        })
      );
    });
  }

  // Education Section
  if (resume.education.length > 0) {
    addSectionHeader('Education');

    resume.education.forEach((edu) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 26
            }),
            new TextRun({
              text: `\t${edu.startDate} - ${edu.endDate || 'Present'}`,
              size: 24
            })
          ],
          spacing: {
            before: 200
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.school} • ${edu.fieldOfStudy}`,
              size: 24,
              color: '4B5563'
            })
          ],
          spacing: {
            before: 100,
            after: edu.gpa ? 100 : 200
          }
        })
      );

      if (edu.gpa) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `GPA: ${edu.gpa}`,
                size: 24
              })
            ],
            spacing: {
              after: 200
            }
          })
        );
      }
    });
  }

  // Skills Section
  if (resume.skills.length > 0) {
    addSectionHeader('Skills');

    const skillsByLevel = resume.skills.reduce((acc, skill) => {
      if (!acc[skill.level]) acc[skill.level] = [];
      acc[skill.level].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(skillsByLevel).forEach(([level, skills]) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: level,
              bold: true,
              size: 24
            })
          ],
          spacing: {
            before: 200
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: skills.join(' • '),
              size: 24
            })
          ],
          spacing: {
            before: 100,
            after: 200
          }
        })
      );
    });
  }

  // Projects Section
  if (resume.projects.length > 0) {
    addSectionHeader('Projects');

    resume.projects.forEach((project) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.title,
              bold: true,
              size: 26
            }),
            new TextRun({
              text: project.url ? ' ↗' : '',
              size: 24,
              color: '2563EB'
            }),
            new TextRun({
              text: `\t${project.startDate} - ${project.endDate}`,
              size: 24
            })
          ],
          spacing: {
            before: 200
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: project.description,
              size: 24
            })
          ],
          spacing: {
            before: 100
          }
        })
      );

      if (project.technologies.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.technologies.join(' • '),
                size: 24,
                color: '2563EB'
              })
            ],
            spacing: {
              before: 100,
              after: 200
            }
          })
        );
      }
    });
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1)
          }
        }
      },
      children: sections
    }]
  });

  // Generate and save the document
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.docx`;
  link.click();
  window.URL.revokeObjectURL(url);
}