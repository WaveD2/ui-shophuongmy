import styled from "styled-components";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const ProductPreviewWrapper = styled.div`
  grid-template-columns: 72px auto;
  gap: 24px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 16px;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: 42px auto;
  }

  @media (max-width: ${breakpoints.xs}) {
    grid-template-columns: 100%;
  }

  .preview-items {
    @media (max-width: ${breakpoints.xs}) {
      width: 80%;
      margin-right: auto;
      margin-left: auto;
      order: 2;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .preview-item {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    transition: ${defaultTheme.default_transition};

    @media (max-width: ${breakpoints.sm}) {
      width: 40px;
      height: 40px;
    }

    &:hover {
      opacity: 0.9;
      outline: 1px solid ${defaultTheme.color_gray};
    }

    &-wrapper {
      padding-top: 4px;
      padding-bottom: 4px;

      @media (max-width: ${breakpoints.xs}) {
        display: flex;
        justify-content: center;
      }
    }
  }

 .preview-display {
  width: 100%; 
  height: 600px; 
  overflow: hidden;  
  display: flex; 
  align-items: center; 
  justify-content: center;
  background-color: #f0f0f0; 
  position: relative; 
}

.preview-display img {
  width: 100%; 
  height: auto; 
  object-fit: cover; 
  transition: opacity 0.2s ease;
  opacity: 0; 
  position: absolute; 
  top: 50%; /* Align center vertically */
  left: 50%; /* Align center horizontally */
  transform: translate(-50%, -50%); /* Center image exactly */
}

@media (max-width: ${breakpoints.md}) {
  .preview-display {
    height: 520px; /* Adjust height for medium screens */
  }
}

@media (max-width: ${breakpoints.sm}) {
  .preview-display {
    height: 400px; /* Adjust height for small screens */
  }
}

@media (max-width: ${breakpoints.xs}) {
  .preview-display {
    height: 320px; /* Adjust height for extra small screens */
  }
}

`;

const ProductPreview = ({ previewImages }) => {
  const [activePreviewImage, setActivePreviewImage] = useState(
    previewImages[0]
  );

  const handlePreviewImageChange = (previewImage) => {
    setActivePreviewImage(previewImage);
  };

  return (
    <ProductPreviewWrapper className="grid items-center">
      <div className="preview-items w-full">
        {previewImages.map((previewImage, index) => {
          return (
            <div
              className="preview-item-wrapper"
              key={index}
              onClick={() => handlePreviewImageChange(previewImage)}
            >
              <div className="preview-item">
                <img
                  src={previewImage}
                  alt=""
                  className="object-fit-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="preview-display">
        <img
          src={activePreviewImage}
          className="object-fit-cover"
          alt="Preview"
          loading="lazy" /* Lazy loading */
          onLoad={(e) => e.currentTarget.style.opacity = 1}
        />
      </div>

    </ProductPreviewWrapper>
  );
};

export default ProductPreview;

ProductPreview.propTypes = {
  previewImages: PropTypes.array,
};
