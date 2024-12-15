//
//  ShareViewController.swift
//  CustomShare
//
//  Created by Alwin on 14/12/2024.
//

import UIKit
import Social
import KeychainAccess

class ShareViewController: SLComposeServiceViewController {
    
    override func isContentValid() -> Bool {
        // Validation not required; return true to proceed
        return true
    }

    override func didSelectPost() {
        // Override and do nothing to remove default posting behavior
        // Simply complete the request
        self.extensionContext!.completeRequest(returningItems: nil, completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        // Remove default configuration items
        return []
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        displayBottomSheet()
    }
    
    private func fetchKeychainData() -> (String?, Error?) {
        do {
            let keychain = Keychain(service: "79T4XQDYMY.io.clarifyapp")
            
            // Retrieve the stored JSON string
            if let jsonString = try keychain.get("auth") {
                // Parse the JSON string to extract uid and refreshToken
                if let jsonData = jsonString.data(using: .utf8),
                   let jsonObject = try JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: String] {
                    let uid = jsonObject["uid"] ?? "Not Found"
                    let refreshToken = jsonObject["refreshToken"] ?? "Not Found"
                    
                    let result = """
                    UID: \(uid)
                    Refresh Token: \(refreshToken)
                    """
                    return (result, nil)
                } else {
                    return ("Invalid JSON format in Keychain.", nil)
                }
            } else {
                return ("No data found for key 'auth'.", nil)
            }
        } catch let error {
            return (nil, error)
        }
    }


    private func displayBottomSheet() {
        let bottomSheetController = BottomSheetViewController()
        let (data, error) = fetchKeychainData()
        
        if let error = error {
            bottomSheetController.infoText = "Error: \(error.localizedDescription)"
        } else if let data = data {
            bottomSheetController.infoText = data
        } else {
            bottomSheetController.infoText = "No data found in the shared keychain."
        }
        
        bottomSheetController.modalPresentationStyle = .overFullScreen
        present(bottomSheetController, animated: true, completion: nil)
    }
}

// MARK: - Bottom Sheet View Controller

class BottomSheetViewController: UIViewController {
    var infoText: String = ""

    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .white
        view.layer.cornerRadius = 16
        view.layer.masksToBounds = true
        return view
    }()
    
    private let infoLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0 // Unlimited lines for large text
        label.textAlignment = .left // Left-align for better readability
        label.textColor = .black
        label.font = UIFont.systemFont(ofSize: 14) // Smaller font for large data
        return label
    }()
    
    private let closeButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Close", for: .normal)
        button.setTitleColor(.systemBlue, for: .normal)
        button.addTarget(self, action: #selector(closeButtonTapped), for: .touchUpInside)
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(white: 0, alpha: 0.5)
        setupLayout()
        infoLabel.text = infoText
    }
    
    private func setupLayout() {
        view.addSubview(containerView)
        containerView.translatesAutoresizingMaskIntoConstraints = false
        containerView.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
        containerView.trailingAnchor.constraint(equalTo: view.trailingAnchor).isActive = true
        containerView.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true
        containerView.heightAnchor.constraint(equalToConstant: 300).isActive = true
        
        containerView.addSubview(infoLabel)
        containerView.addSubview(closeButton)
        
        infoLabel.translatesAutoresizingMaskIntoConstraints = false
        infoLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 20).isActive = true
        infoLabel.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 20).isActive = true
        infoLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -20).isActive = true
        
        closeButton.translatesAutoresizingMaskIntoConstraints = false
        closeButton.topAnchor.constraint(equalTo: infoLabel.bottomAnchor, constant: 20).isActive = true
        closeButton.centerXAnchor.constraint(equalTo: containerView.centerXAnchor).isActive = true
    }
    
    @objc private func closeButtonTapped() {
        dismiss(animated: true, completion: nil)
    }
}
