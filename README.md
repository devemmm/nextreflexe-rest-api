## REMEMBER TO MODIFY TIME STAMPS FOR EACH TABLE;
    Example

    ALTER TABLE appointment MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE appointment MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE branch MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE branch MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE branch_location MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE branch_location MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE observation MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE observation MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE patient MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE patient MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE patient_location MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE patient_location MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE payment MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE payment MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE service MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE service MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE token MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE token MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE user MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE user MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE user_location MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE user_location MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

    ALTER TABLE visit MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    ALTER TABLE visit MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;