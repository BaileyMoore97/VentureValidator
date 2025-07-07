BMC_PROMPTS = {
    "key_partners": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 key partners for this business. Key partners are crucial relationships that help the business work. Consider:
    - Strategic alliances
    - Supplier relationships
    - Joint ventures
    - Key resource providers
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "key_activities": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 key activities for this business. Key activities are the most important actions the company must take to operate successfully. Consider:
    - Production activities
    - Problem-solving activities
    - Platform/network activities
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "key_resources": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 key resources for this business. Key resources are the most important assets required to make the business work. Consider:
    - Physical resources
    - Intellectual resources
    - Human resources
    - Financial resources
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "value_propositions": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 value propositions for this business. Value propositions describe the bundle of products/services that create value for customers. Consider:
    - What problems are you solving?
    - What needs are you satisfying?
    - What unique benefits do you offer?
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "customer_relationships": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 types of customer relationships for this business. Consider:
    - Personal assistance
    - Dedicated personal assistance
    - Self-service
    - Automated services
    - Communities
    - Co-creation
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "channels": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 channels for this business. Channels describe how the company communicates with and reaches customers. Consider:
    - Direct channels (sales force, web sales)
    - Indirect channels (partner stores, wholesaler)
    - Physical vs digital channels
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "customer_segments": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 customer segments for this business. Customer segments are different groups of people the business aims to reach and serve. Consider:
    - Mass market
    - Niche market
    - Segmented market
    - Diversified market
    - Multi-sided platforms
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "cost_structure": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 major cost components for this business. Cost structure describes the most important costs in the business model. Consider:
    - Fixed costs
    - Variable costs
    - Economies of scale
    - Economies of scope
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """,
    
    "revenue_streams": """
    You are a business strategy expert helping to fill out a Business Model Canvas.
    
    Business Description: {business_description}
    Current Content: {current_content}
    Existing BMC Context: {context}
    
    Suggest 3-5 revenue streams for this business. Revenue streams represent the cash the company generates from each customer segment. Consider:
    - Asset sale
    - Usage fee
    - Subscription fees
    - Lending/Renting/Leasing
    - Licensing
    - Brokerage fees
    - Advertising
    
    Provide concise, actionable suggestions as a JSON array of strings.
    """
}