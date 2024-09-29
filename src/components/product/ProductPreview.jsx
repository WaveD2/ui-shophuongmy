import styled from "styled-components";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import ImageLoader from "../common/ImageLoading";

const ProductPreviewWrapper = styled.div`
  grid-template-columns: 72px auto;
  gap: 20px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 14px;
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
  height: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  background-color: #f0f0f0; 
  position: relative; 
  border-radius: 8px;
}

.preview-display img {
  width: 100%; 
  height: auto; 
  object-fit: contain; 
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

const ProductPreview = ({ images, previewImage }) => {
  const [activePreviewImage, setActivePreviewImage] = useState();

  const handlePreviewImageChange = (previewImage) => {
    setActivePreviewImage(previewImage);
  };

  useEffect(() => {
    if (!previewImage) {
      setActivePreviewImage(images[0].image);
    } else {
      setActivePreviewImage(previewImage.value)
    }
  }, [previewImage]);

  console.log("activePreviewImage::", activePreviewImage);

  return (
    <ProductPreviewWrapper className="grid items-center">
      <div className="preview-items w-full">
        {Array.isArray(images) && images?.map((previewImage, index) => {
          return (
            <div
              className="preview-item-wrapper"
              key={index}
              onClick={() => handlePreviewImageChange(previewImage.image)}
            >
              <ImageLoader
                src={previewImage.image}
                alt="anh san pham"
                classStyle={"preview-item"}
              />
            </div>
          )
        })}
      </div>
      <ImageLoader
        classStyle={"preview-display"}
        src={activePreviewImage}
        alt="anh san pham"
      />

    </ProductPreviewWrapper>
  );
};

export default ProductPreview;

ProductPreview.propTypes = {
  previewImages: PropTypes.array,
};
