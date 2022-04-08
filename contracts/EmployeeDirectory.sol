// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EmployeeDirectory is Ownable {
    uint8 empId;

    struct Employee {
        uint8 empId;
        string name;
    }

    Employee[] public employee;
    mapping(uint8 => string) public empIdToDetails;

    function retrieve(uint8 _empId) public view returns (string memory) {
        return empIdToDetails[uint8(_empId)];
    }

    function removeEmployee(uint8 _empId) public onlyOwner {
        delete empIdToDetails[uint8(_empId)];
    }

    function addEmployee(uint8 _empId, string memory _name) public onlyOwner {
        empIdToDetails[_empId] = _name;
        employee.push(Employee(_empId, _name));
    }
}
