import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PointElement, 
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  ChartDataLabels
);

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  height: '100%',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-5px)',
  }
}));

const AdvancedCharts = ({ students, marks, subject }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    gradeDistribution: null,
    passingRate: null,
    gradeRanges: null,
    skillRadar: null
  });

  useEffect(() => {
    if (students && marks && marks.length > 0) {
      prepareChartData();
    }
  }, [students, marks]);

  const prepareChartData = () => {
    // Get all marks for the current subject
    const subjectMarks = marks.filter(mark => mark.subject === subject);
    
    // Grade distribution data
    const gradeRanges = [
      { range: '0-54', count: 0, color: theme.palette.error.main },
      { range: '55-64', count: 0, color: theme.palette.warning.main },
      { range: '65-74', count: 0, color: theme.palette.info.main },
      { range: '75-84', count: 0, color: theme.palette.success.light },
      { range: '85-100', count: 0, color: theme.palette.primary.main }
    ];

    subjectMarks.forEach(mark => {
      const grade = mark.mark;
      if (grade < 55) gradeRanges[0].count++;
      else if (grade < 65) gradeRanges[1].count++;
      else if (grade < 75) gradeRanges[2].count++;
      else if (grade < 85) gradeRanges[3].count++;
      else gradeRanges[4].count++;
    });

    // Passing vs Failing data
    const passing = subjectMarks.filter(mark => mark.mark >= 55).length;
    const failing = subjectMarks.length - passing;

    // Prepare data for radar chart (simulated skills assessment)
    // In a real app, you would have actual skill categories
    const skillCategories = ['הבנה', 'יישום', 'ניתוח', 'הערכה', 'יצירה'];
    const skillScores = skillCategories.map(() => {
      // Simulate skill scores based on marks distribution
      const avgMark = subjectMarks.reduce((sum, mark) => sum + mark.mark, 0) / subjectMarks.length;
      // Add some random variation to make the radar chart interesting
      return Math.min(100, Math.max(0, avgMark + (Math.random() * 20 - 10)));
    });

    setChartData({
      gradeDistribution: {
        labels: gradeRanges.map(range => range.range),
        datasets: [{
          data: gradeRanges.map(range => range.count),
          backgroundColor: gradeRanges.map(range => range.color),
          borderColor: gradeRanges.map(range => range.color),
          borderWidth: 1,
        }]
      },
      passingRate: {
        labels: ['עוברים', 'נכשלים'],
        datasets: [{
          data: [passing, failing],
          backgroundColor: [theme.palette.success.main, theme.palette.error.main],
          borderColor: [theme.palette.success.dark, theme.palette.error.dark],
          borderWidth: 1,
        }]
      },
      gradeRanges: {
        labels: gradeRanges.map(range => range.range),
        datasets: [{
          label: 'מספר תלמידים',
          data: gradeRanges.map(range => range.count),
          backgroundColor: gradeRanges.map(range => `${range.color}CC`),
          borderColor: gradeRanges.map(range => range.color),
          borderWidth: 2,
          borderRadius: 8,
          barThickness: 30,
        }]
      },
      skillRadar: {
        labels: skillCategories,
        datasets: [{
          label: 'רמת מיומנות ממוצעת',
          data: skillScores,
          backgroundColor: `${theme.palette.primary.main}33`,
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
          pointBackgroundColor: theme.palette.primary.main,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: theme.palette.primary.main,
          pointRadius: 4,
        }]
      }
    });
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
            family: theme.typography.fontFamily
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return percentage > 5 ? `${percentage}%` : '';
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: theme.typography.fontFamily
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value > 0 ? value : '',
        color: (context) => context.dataset.borderColor,
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: theme.typography.fontFamily
          }
        }
      },
      datalabels: {
        display: false
      }
    }
  };

  // If no data is available yet
  if (!chartData.gradeDistribution) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          טוען נתונים...
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ChartContainer>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            התפלגות ציונים
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Pie data={chartData.gradeDistribution} options={pieOptions} />
          </Box>
        </ChartContainer>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <ChartContainer>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            עוברים מול נכשלים
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Pie data={chartData.passingRate} options={pieOptions} />
          </Box>
        </ChartContainer>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <ChartContainer>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            טווחי ציונים
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Bar data={chartData.gradeRanges} options={barOptions} />
          </Box>
        </ChartContainer>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <ChartContainer>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            ניתוח מיומנויות
          </Typography>
          <Box sx={{ height: 300, position: 'relative' }}>
            <Radar data={chartData.skillRadar} options={radarOptions} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
            * הערה: נתוני המיומנויות הם להדגמה בלבד ומבוססים על ממוצע הציונים
          </Typography>
        </ChartContainer>
      </Grid>
    </Grid>
  );
};

export default AdvancedCharts;