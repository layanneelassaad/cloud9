// src/components/OrganizationCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x200?text=No+Image";

const OrganizationCard = ({ organization }) => {
  const imageSrc = organization.profile_picture || PLACEHOLDER_IMAGE;

  return (
    <Card 
      sx={{ 
        width: 345, 
        height: 420, // Fixed total card height
        borderRadius: "10px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }
      }}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={organization.name || "Organization"}
        sx={{
          height: 180,
          objectFit: "cover",
          backgroundColor: "#f0f0f0"
        }}
      />
      <CardContent
        sx={{
          fontFamily: "'Roboto', sans-serif",
          textAlign: "center",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: "700", 
              letterSpacing: "0.5px",
              mb: 1
            }}
          >
            {organization.name || "Unnamed Org"}
          </Typography>

          {/* Description with truncation */}
          {organization.description && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2, 
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "48px" // about 3 lines of text
              }}
            >
              {organization.description}
            </Typography>
          )}

          {organization.contact_email && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              Contact: {organization.contact_email}
            </Typography>
          )}
        </div>

        {organization.website_url && (
          <Button
            variant="contained"
            color="primary"
            href={organization.website_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: "auto",
              mb: 1,
              textTransform: "none",
              fontWeight: "500"
            }}
          >
            Visit Website
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
