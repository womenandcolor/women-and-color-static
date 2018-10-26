import React from 'react'
import StyledButton from 'appCommon/StyledButton';
import { Link } from 'gatsby';


const JobButton = () => (
    <Link to="job/new">    
        <StyledButton color="primary">
            Post a Job
        </StyledButton>
    </Link>
)

export default JobButton;