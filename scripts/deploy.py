from brownie import EmployeeDirectory, network, config
from scripts.helpful_scripts import (
    get_account,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)


def deploy_employee_directory():
    account = get_account()

    employee_directory = EmployeeDirectory.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify"),
    )
    print(f"Contract deployed to {employee_directory.address}")
    return employee_directory


def main():
    deploy_employee_directory()
